import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Advantage } from '../model/advantage.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AdvantageService } from '../service/advantage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-adv-dsdm',
  templateUrl: './adv-dsdm.component.html',
  styleUrls: ['./adv-dsdm.component.scss']
})
export class AdvDsdmComponent implements OnInit {
  advantageForm!: FormGroup;
  advantage: Advantage = new Advantage();
  imageUrl: SafeUrl | undefined;
  isSubmitted = true;
  hasAdvantage = false;
  editMode = false;
  selectedImageURL: string;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private advantageService: AdvantageService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.advantageForm = this.fb.group({
      titre: ['', Validators.required],
      desc: ['', Validators.required],
      image: [null]
    });
    this.route.queryParams.subscribe(params => {
      this.editMode = params['edit'] === 'true';
      this.loadAdvantage();
    });
  }

  loadAdvantage(): void {
    this.advantageService.retrieveAdvantages().subscribe({
      next: (data: Advantage[]) => {
        if (data.length) {
          this.advantage = data[0];
          this.hasAdvantage = true;
          this.isSubmitted = !this.editMode;
          this.advantageForm.patchValue({
            titre: this.advantage.titre,
            desc: this.advantage.desc
          });
          if (this.advantage.imageUrl) {
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.advantage.imageUrl}`);
          }
        } else {
          this.hasAdvantage = false;
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
    if (this.advantageForm.valid) {
      const formData = new FormData();
      formData.append('id', this.advantage.id); // Assuming this.advantage.id is a string
      formData.append('titre', this.advantageForm.get('titre')!.value);
      formData.append('desc', this.advantageForm.get('desc')!.value);
      if (this.selectedImage) {
        formData.append('imageUrl', this.selectedImage);
      }

      if (this.editMode) {
        this.advantageService.updateAdvantage(this.advantage.id, formData).subscribe({
          next: (data: any) => {
            this.advantage = data;
            if (this.advantage.imageUrl) {
              this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.advantage.imageUrl}`);
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
        this.advantageService.addAdvantage(formData).subscribe({
          next: (data: any) => {
            this.advantage = data;
            if (this.advantage.imageUrl) {
              this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.advantage.imageUrl}`);
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

  onAddAdvantage(): void {
    this.router.navigate([], { queryParams: { edit: true } });
  }
}
