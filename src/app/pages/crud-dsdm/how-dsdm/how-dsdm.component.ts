import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { How } from '../model/how.model';
import { HowService } from '../service/how.service';

@Component({
  selector: 'app-how-dsdm',
  templateUrl: './how-dsdm.component.html',
  styleUrls: ['./how-dsdm.component.scss']
})
export class HowDsdmComponent implements OnInit {
  howForm!: FormGroup;
  how: How = new How();
  imageUrl: SafeUrl | undefined;
  isSubmitted = true;
  hasHow = false;
  editMode = false;
  selectedImageURL: string;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private howService: HowService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.howForm = this.fb.group({
      titre: ['', Validators.required],
      desc: ['', Validators.required],
      image: [null]
    });
    this.route.queryParams.subscribe(params => {
      this.editMode = params['edit'] === 'true';
      this.loadHow();
    });
  }

  loadHow(): void {
    this.howService.retrieveHows().subscribe({
      next: (data: How[]) => {
        if (data.length) {
          this.how = data[0];
          this.hasHow = true;
          this.isSubmitted = !this.editMode;
          this.howForm.patchValue({
            titre: this.how.titre,
            desc: this.how.desc
          });
          if (this.how.imageUrl) {
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.how.imageUrl}`);
          }
        } else {
          this.hasHow = false;
        }
      },
      error: (error) => console.error('Error:', error)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0] as File;
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedImage = null;
    this.selectedImageURL = '';
  }

  onSubmit(): void {
    if (this.howForm.valid) {
      const formData = new FormData();
      formData.append('id', this.how.id); // Assuming this.how.id is a string
      formData.append('titre', this.howForm.get('titre')!.value);
      formData.append('desc', this.howForm.get('desc')!.value);
      if (this.selectedImage) {
        formData.append('imageUrl', this.selectedImage);
      }

      if (this.editMode) {
        this.howService.updateHow(this.how.id, formData).subscribe({
          next: (data: any) => {
            this.how = data;
            if (this.how.imageUrl) {
              this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.how.imageUrl}`);
            }
            this.router.navigate([], { queryParams: { edit: false } });
            this.isSubmitted = true;
          },
          error: (error) => {
            console.error('Error:', error);
            alert('Une erreur s\'est produite lors de la soumission du formulaire. Veuillez réessayer.');
          }
        });
      } else {
        this.howService.addHow(formData).subscribe({
          next: (data: any) => {
            this.how = data;
            if (this.how.imageUrl) {
              this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.how.imageUrl}`);
            }
            this.router.navigate([], { queryParams: { edit: false } });
            this.isSubmitted = true;
          },
          error: (error) => {
            console.error('Error:', error);
            alert('Une erreur s\'est produite lors de la soumission du formulaire. Veuillez réessayer.');
          }
        });
      }
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }

  onEdit(): void {
    this.router.navigate([], { queryParams: { edit: true } });
  }

  onAddHow(): void {
    this.router.navigate([], { queryParams: { edit: true } });
  }
}
