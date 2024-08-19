import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { How } from '../model/how.model';
import { HowService } from '../service/how.service';

@Component({
  selector: 'ngx-how-dsdm',
  templateUrl: './how-dsdm.component.html',
  styleUrls: ['./how-dsdm.component.scss']
})
export class HowDsdmComponent implements OnInit {
  howForm!: FormGroup;
  how: How = new How();
  imageUrl: SafeUrl | undefined;
  isSubmitted = true;
  hasHow = false;
  isAdding = false; // Nouveau état pour l'ajout
  editMode = false;
  selectedImageURL: string | undefined;
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
      this.isAdding = params['add'] === 'true'; // Nouvelle condition pour l'ajout
      this.editMode = params['edit'] === 'true';
      this.loadHow();
    });
  }

  loadHow(): void {
    if (!this.isAdding) {
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
    } else {
      this.hasHow = false; // Pas de données à charger pour l'ajout
    }
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
    this.selectedImageURL = undefined;
  }

  onSubmit(): void {
    if (this.howForm.valid) {
      const formData = new FormData();
      if (this.how.id) {
        formData.append('id', this.how.id); // Assurez-vous que `this.how.id` est défini pour la mise à jour
      }
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
            this.router.navigate([], { queryParams: { add: false } });
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
    this.isAdding = false;
  }

  onAddHow(): void {
    this.router.navigate([], { queryParams: { add: true } });
    this.editMode = false;
  }
}
