import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { Router } from '@angular/router';
import { ImageService } from '../../services/imageService.service'; // Adjust path as needed

@Component({
  selector: 'app-create-poster',
  templateUrl: './create-poster.component.html',
  styleUrls: ['./create-poster.component.scss']
})
export class CreatePosterComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;
  private canvas!: fabric.Canvas;
  textToAdd: string = ''; // Input field for text content
  textColor: string = '#000000'; // Default text color
  fontSize: number = 20; // Default font size

  constructor(private router: Router, private imageService: ImageService) {}

  ngOnInit(): void {
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement);
    this.canvas.setWidth(800);
    this.canvas.setHeight(600);
  }

  addText(): void {
    const options = {
      left: 100,
      top: 100,
      fontSize: this.fontSize,
      fontFamily: 'Arial',
      fill: this.textColor
    };
    this.addTextToCanvas(this.textToAdd, options);
  }
  
  private addTextToCanvas(content: string, options: { left: number, top: number, fontSize: number, fontFamily: string, fill: string }): void {
    const text = new fabric.Textbox(content, {
      left: options.left,
      top: options.top,
      fontSize: options.fontSize,
      fontFamily: options.fontFamily,
      fill: options.fill
    });
    this.canvas.add(text);
  }

  addImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgObj = new Image();
        imgObj.src = e.target?.result as string;
        imgObj.onload = () => {
          const image = new fabric.Image(imgObj);
          image.set({
            left: 100,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5
          });
          this.canvas.add(image);
        };
      };
      reader.readAsDataURL(file);
    }
  }

  deleteSelected(): void {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject) {
      if (activeObject.type === 'image' || activeObject.type === 'textbox') {
        this.canvas.remove(activeObject);
      }
    }
  }

  exportImage(): void {
    const dataURL = this.canvas.toDataURL({ format: 'png' });
    this.imageService.setImageData(dataURL); // Store image data in service
    this.router.navigate(['/ticketing/create-event']); // Navigate to create event component
  }
}
