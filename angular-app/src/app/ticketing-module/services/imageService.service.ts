import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageData: string | null = null;

  setImageData(data: string): void {
    this.imageData = data;
  }

  getImageData(): string | null {
    return this.imageData;
  }
}
