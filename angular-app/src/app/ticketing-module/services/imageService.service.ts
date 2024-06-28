import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageData: string | null = null;

  setImageData(data: string): void {
    this.imageData = data;
    console.log('Image data set:', this.imageData); // Debugging log
  }

  getImageData(): string | null {
    console.log('Getting image data:', this.imageData); // Debugging log
    return this.imageData;
  }
}
