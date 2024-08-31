import { Component } from '@angular/core';
import { Composant } from '../../../../core/models/dsdm_models/composant.model';
import { ComposantService } from '../../../../core/services/dsdm_services/composant.service';

@Component({
  selector: 'ngx-add-dsdm',
  templateUrl: './add-dsdm.component.html',
  styleUrls: ['./add-dsdm.component.scss']
})
export class AddDsdmComponent {

  selectedImage: File | null = null;
  composant: Composant = new Composant();
  selectedImageURL: string;

  constructor(private composantService: ComposantService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0] as File;

      // Assign the selected file directly to this.selectedImage
      this.selectedImage = file;

      // Use FileReader to read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        // Assign the data URL to this.selectedImageURL
        this.selectedImageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedImage = null;
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('nomComposant', this.composant.nomComposant);
    formData.append('titre', this.composant.titre);
    formData.append('desc', this.composant.desc);
    formData.append('typeAff', this.composant.typeAff);
    if (this.selectedImage) {
      formData.append('imageUrl', this.selectedImage, this.selectedImage.name);
    }

    this.composantService.addComposant(formData)
      .subscribe(
        (response) => {
          console.log('Composant ajouté avec succès:', response);

          console.log('Composant ajouté avec succès:', response);
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du composant:', error);
        }

      );

  }

  resetForm(): void {
    this.composant = new Composant(); // Réinitialiser le modèle de composant
    this.selectedImage = null; // Réinitialiser l'image sélectionnée
  }
  onEditorKeyup(desc:string){
   this.composant.desc=desc;
   console.log(desc,"hadha desc");
  }
}
