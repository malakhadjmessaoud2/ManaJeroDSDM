import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComposantService } from '../service/composant.service';

@Component({
  selector: 'ngx-update-dsdm',
  templateUrl: './update-dsdm.component.html',
  styleUrls: ['./update-dsdm.component.scss']
})
export class UpdateDsdmComponent implements OnInit {
  updateForm: FormGroup;
  composantId: string;
  selectedImageURL: any;
  showMessage: boolean = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private composantService: ComposantService
  ) {
    this.updateForm = this.fb.group({
      id: [''],
      nomComposant: [''],
      titre: [''],
      desc: [''],
      imageUrl: [null]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.composantId = params.id;
        this.updateForm.patchValue({
          id: params.id,  // Set id field value
          nomComposant: params.name || '',
          titre: params.title || '',
          desc: params.desc || ''
        });
        console.log("params.id", params.id);
      }
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateForm.patchValue({
        imageUrl: file
      });
      // Optional: Display preview of selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageURL = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.updateForm.patchValue({
      imageUrl: null
    });
    this.selectedImageURL = null;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('id', this.updateForm.get('id')!.value);
    formData.append('nomComposant', this.updateForm.get('nomComposant')!.value);
    formData.append('titre', this.updateForm.get('titre')!.value);
    formData.append('desc', this.updateForm.get('desc')!.value);
    if (this.updateForm.get('imageUrl')!.value) {
      formData.append('imageUrl', this.updateForm.get('imageUrl')!.value);
    }
    formData.append('typeAff', "");

    console.log([...(<any>formData).entries()]); // Debugging line with type assertion

    this.composantService.updateComposant(this.composantId, formData).subscribe(
      response => {
        console.log('Composant updated successfully', response);
        this.router.navigate(['/pages/crudDsdm']);
      },
      error => {
        console.error('Error updating composant', error);
      }
    );
  }
  validateForm(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000); // Hide message after 3 seconds
  }
}
