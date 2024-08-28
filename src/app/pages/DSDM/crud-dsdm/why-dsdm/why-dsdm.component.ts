import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Why } from '../../../../core/models/why.model';
import { WhyService } from '../../../../core/services/why.service';

@Component({
  selector: 'ngx-why-dsdm',
  templateUrl: './why-dsdm.component.html',
  styleUrls: ['./why-dsdm.component.scss']
})
export class WhyDsdmComponent implements OnInit {
  whyForm!: FormGroup;
  why: Why = new Why();
  imageUrl: SafeUrl | undefined;
  isSubmitted = true;
  hasWhy = false;
  isAdding = false;
  editMode = false;
  selectedImageURL: string;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private whyService: WhyService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.whyForm = this.fb.group({
      titre: ['', Validators.required],
      desc: ['', Validators.required],
      image: [null]
    });
    this.route.queryParams.subscribe(params => {
      this.editMode = params['edit'] === 'true';
      this.loadWhy();
    });
  }

  loadWhy(): void {
    this.whyService.retrieveWhys().subscribe({
      next: (data: Why[]) => {
        if (data.length) {
          this.why = data[0];
          this.hasWhy = true;
          this.isSubmitted = !this.editMode;
          this.whyForm.patchValue({
            titre: this.why.titre,
            desc: this.why.desc
          });
          if (this.why.imageUrl) {
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.why.imageUrl}`);
          }
        } else {
          this.hasWhy = false;
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
    if (window.confirm('Voulez-vous vraiment soumettre ce formulaire ?')) {
      if (this.whyForm.valid) {
        const formData = new FormData();
        formData.append('id', this.why.id); // Assuming this.why.id is a string
        formData.append('titre', this.whyForm.get('titre')!.value);
        formData.append('desc', this.whyForm.get('desc')!.value);
        if (this.selectedImage) {
          formData.append('imageUrl', this.selectedImage);
        }

        if (this.editMode) {
          this.whyService.updateWhy(this.why.id, formData).subscribe({
            next: (data: any) => {
              this.why = data;
              if (this.why.imageUrl) {
                this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.why.imageUrl}`);
              }
              this.router.navigate([], { queryParams: { edit: false } });
              this.isSubmitted = true;
              this.isAdding = false;
            },
            error: (error) => {
              console.error('Error:', error);
              alert('Une erreur s\'est produite lors de la soumission du formulaire. Veuillez réessayer.');
            }
          });
        } else {
          this.whyService.addWhy(formData).subscribe({
            next: (data: any) => {
              this.why = data;
              if (this.why.imageUrl) {
                this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.why.imageUrl}`);
              }
              this.router.navigate([], { queryParams: { edit: false } });
              this.isSubmitted = true;
              this.isAdding = false;
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
  }

  onEdit(): void {
    this.router.navigate([], { queryParams: { edit: true } });
  }

  onAddWhy(): void {
    this.isAdding = true;
    this.editMode = false;
    this.whyForm.reset();
    this.selectedImageURL = '';
  }
}
