import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Limitation } from '../../../../core/models/dsdm_models/limitation.model';
import { LimitationService } from '../../../../core/services/dsdm_services/limitation.service';

@Component({
  selector: 'ngx-lim-dsdm',
  templateUrl: './lim-dsdm.component.html',
  styleUrls: ['./lim-dsdm.component.scss']
})
export class LimDsdmComponent implements OnInit {
  limitationForm!: FormGroup;
  limitation: Limitation = new Limitation();
  imageUrl: SafeUrl | undefined;
  isSubmitted = true;
  hasLimitation = false;
  isAdding = false;
  editMode = false;
  selectedImageURL: string | undefined;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private limitationService: LimitationService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.limitationForm = this.fb.group({
      titre: ['', Validators.required],
      desc: ['', Validators.required],
      image: [null]
    });
    this.route.queryParams.subscribe(params => {
      this.editMode = params['edit'] === 'true';
      this.loadLimitation();
    });
  }

  loadLimitation(): void {
    this.limitationService.retrieveLimitations().subscribe({
      next: (data: Limitation[]) => {
        if (data.length) {
          this.limitation = data[0];
          this.hasLimitation = true;
          this.isSubmitted = !this.editMode;
          this.limitationForm.patchValue({
            titre: this.limitation.titre,
            desc: this.limitation.desc
          });
          if (this.limitation.imageUrl) {
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.limitation.imageUrl}`);
          }
        } else {
          this.hasLimitation = false;
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
    if (this.limitationForm.valid) {
      const formData = new FormData();
      formData.append('id', this.limitation.id); // Assuming this.limitation.id is a string
      formData.append('titre', this.limitationForm.get('titre')!.value);
      formData.append('desc', this.limitationForm.get('desc')!.value);
      if (this.selectedImage) {
        formData.append('imageUrl', this.selectedImage);
      }

      if (this.editMode) {
        this.limitationService.updateLimitation(this.limitation.id, formData).subscribe({
          next: (data: Limitation) => {
            this.limitation = data;
            if (this.limitation.imageUrl) {
              this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.limitation.imageUrl}`);
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
        this.limitationService.addLimitation(formData).subscribe({
          next: (data: Limitation) => {
            this.limitation = data;
            if (this.limitation.imageUrl) {
              this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.limitation.imageUrl}`);
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

  onEdit(): void {
    this.router.navigate([], { queryParams: { edit: true } });
  }

  onAddLimitation(): void {
    this.isAdding = true;
    this.editMode = false;
    this.limitationForm.reset();
    this.selectedImageURL = '';
  }
}
