import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComposantService } from '../service/composant.service';

@Component({
  selector: 'app-delete-dsdm',
  templateUrl: './delete-dsdm.component.html',
  styleUrls: ['./delete-dsdm.component.scss']
})
export class DeleteDsdmComponent {
  deleteForm: FormGroup;

  constructor(
    private composantService: ComposantService,
    private fb: FormBuilder
  ) {
    this.deleteForm = this.fb.group({
      idComposant: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.deleteForm.valid) {
      const idComposant = this.deleteForm.get('idComposant')?.value;

      this.composantService.removeComposant(idComposant).subscribe(
        () => {
          console.log(`Composant with ID ${idComposant} has been deleted.`);
          this.deleteForm.reset();
        },
        (error) => {
          console.error('Error deleting composant:', error);
        }
      );
    }
  }
}
