import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IntroService } from '../../../../core/services/intro.service';

@Component({
  selector: 'ngx-intro-dsdm',
  templateUrl: './intro-dsdm.component.html',
  styleUrls: ['./intro-dsdm.component.scss']
})
export class IntroDsdmComponent implements OnInit {
  introForm!: FormGroup;
  intro: any = {};
  imageUrl: SafeUrl | undefined;
  isSubmitted = true;
  hasIntro = false;
  isAdding = false;
  editMode = false;
  selectedImageURL: string;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private introService: IntroService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.introForm = this.fb.group({
      titre: ['', Validators.required],
      desc: ['', Validators.required],
      image: [null]
    });
    this.route.queryParams.subscribe(params => {
      this.editMode = params['edit'] === 'true';
      this.loadIntro();
    });
  }

  loadIntro(): void {
    this.introService.retrieveIntros().subscribe({
      next: (data: any[]) => {
        if (data.length) {
          this.intro = data[0];
          this.hasIntro = true;
          this.isSubmitted = !this.editMode;
          this.introForm.patchValue({
            titre: this.intro.titre,
            desc: this.intro.desc
          });
          if (this.intro.imageUrl) {
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.intro.imageUrl}`);
          }
        } else {
          this.hasIntro = false;
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
      if (this.introForm.valid) {
        const formData = new FormData();
        formData.append('id', this.intro.id); // Assuming this.intro.id is a string
        formData.append('titre', this.introForm.get('titre')!.value);
        formData.append('desc', this.introForm.get('desc')!.value);
        if (this.selectedImage) {
          formData.append('imageUrl', this.selectedImage);
        }

        if (this.editMode) {
          this.introService.updateIntro(formData).subscribe({
            next: (data: any) => {
              this.intro = data;
              if (this.intro.imageUrl) {
                this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.intro.imageUrl}`);
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
          this.introService.addIntro(formData).subscribe({
            next: (data: any) => {
              this.intro = data;
              if (this.intro.imageUrl) {
                this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.intro.imageUrl}`);
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

  onAddIntro(): void {
    this.isAdding = true;
    this.editMode = false;
    this.introForm.reset();
    this.selectedImageURL = '';
  }
}
