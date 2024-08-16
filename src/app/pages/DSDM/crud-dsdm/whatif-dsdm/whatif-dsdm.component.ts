import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Whatif } from '../model/whatif.model';
import { WhatifService } from '../service/whatif.service';

@Component({
  selector: 'ngx-whatif-dsdm',
  templateUrl: './whatif-dsdm.component.html',
  styleUrls: ['./whatif-dsdm.component.scss']
})
export class WhatifDsdmComponent implements OnInit {
  whatifForm!: FormGroup;
  whatif: Whatif = new Whatif();
  imageUrl: SafeUrl | undefined;
  isSubmitted = true;
  hasWhatif = false;
  editMode = false;
  isAdding = false; // New state
  selectedImageURL: string | undefined;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private whatifService: WhatifService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.whatifForm = this.fb.group({
      titre: ['', Validators.required],
      desc: ['', Validators.required],
      image: [null]
    });

    this.route.queryParams.subscribe(params => {
      this.editMode = params['edit'] === 'true';
      this.isAdding = params['add'] === 'true'; // Set isAdding based on query params
      this.loadWhatif();
    });
  }

  loadWhatif(): void {
    if (this.editMode || this.isAdding) {
      // Do nothing, as we're in edit or add mode
      return;
    }

    this.whatifService.retrieveWhatifs().subscribe({
      next: (data: Whatif[]) => {
        if (data.length) {
          this.whatif = data[0];
          this.hasWhatif = true;
          this.isSubmitted = !this.editMode;
          this.whatifForm.patchValue({
            titre: this.whatif.titre,
            desc: this.whatif.desc
          });
          if (this.whatif.imageUrl) {
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.whatif.imageUrl}`);
          }
        } else {
          this.hasWhatif = false;
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
    this.selectedImageURL = undefined;
  }

  onSubmit(): void {
    if (this.whatifForm.valid) {
      const formData = new FormData();
      formData.append('id', this.whatif.id); // Assuming this.whatif.id is a string
      formData.append('titre', this.whatifForm.get('titre')!.value);
      formData.append('desc', this.whatifForm.get('desc')!.value);
      if (this.selectedImage) {
        formData.append('imageUrl', this.selectedImage);
      }

      if (this.editMode) {
        this.whatifService.updateWhatif(this.whatif.id, formData).subscribe({
          next: (data: any) => {
            this.whatif = data;
            if (this.whatif.imageUrl) {
              this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.whatif.imageUrl}`);
            }
            this.router.navigate([], { queryParams: { edit: false, add: false } });
            this.isSubmitted = true;
          },
          error: (error) => {
            console.error('Error:', error);
            alert('Une erreur s\'est produite lors de la soumission du formulaire. Veuillez réessayer.');
          }
        });
      } else if (this.isAdding) {
        this.whatifService.addWhatif(formData).subscribe({
          next: (data: any) => {
            this.whatif = data;
            if (this.whatif.imageUrl) {
              this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.whatif.imageUrl}`);
            }
            this.router.navigate([], { queryParams: { edit: false, add: false } });
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
    this.router.navigate([], { queryParams: { edit: true, add: false } });
  }

  onAddWhatif(): void {
    this.router.navigate([], { queryParams: { edit: false, add: true } });
  }
}
