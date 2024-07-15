import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteListComponent } from '../../layout/infinite-list/infinite-list.component';
import { Composant } from '../model/composant.model';
import { ComposantService } from '../service/composant.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'ngx-dsdm',
  templateUrl: './dsdm.component.html',
  styleUrls: ['./dsdm.component.scss']
})
export class DSDMComponent implements OnInit {
  composants: Composant[] = [];
  images: SafeUrl[] = [];

  constructor(private composantService: ComposantService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadComposants();
  }

  loadComposants(): void {
    this.composantService.retrieveComposants().subscribe((data: Composant[]) => {
      this.composants = data;
      this.images = this.composants.map(composant => this.convertImageToSafeUrl(composant.imageUrl));
    });
  }

  convertImageToSafeUrl(image: any): SafeUrl {
    if (image instanceof Blob) {
      const objectURL = URL.createObjectURL(image);
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
    return image; // If not a Blob, assume it's already a URL
  }

  getImageByIndex(index: number): SafeUrl {
    return this.images[index];
  }

  deleteComposant(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce composant ?')) {
      this.composantService.removeComposant(id).subscribe(() => {
        this.composants = this.composants.filter(composant => composant.id !== id);
        this.images = this.images.filter((_, index) => this.composants[index].id !== id);
        alert('Composant supprimé avec succès');
      }, (error) => {
        console.error('Erreur lors de la suppression du composant :', error);
        alert('Erreur lors de la suppression du composant');
      });
    }
  }


  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1
  };

  @ViewChild(InfiniteListComponent) infiniteListComponent: InfiniteListComponent;

  loadNext(cardData) {
    this.infiniteListComponent.loadNext(cardData);
  }
}
