import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class Gallery {
  @Input() images: string[] = [];
  selectedIndex = 0;

  constructor() {}

  selectImage(index: number) {
    this.selectedIndex = index;
  }
}
