import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { Meme } from '../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {
  @Input() meme: Meme | Observable<Meme>;
  @ViewChild('meme') canvas: ElementRef;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.meme instanceof Observable) {
      this.meme.subscribe(meme => this.drawCanvas(meme));
    } else {
      this.drawCanvas(this.meme as Meme);
    }
  }

  private drawCanvas(meme: Meme) {
    const context = this.canvas.nativeElement.getContext("2d");

    const draw = function () {
      context.canvas.width = image.width;
      context.canvas.height = image.height;
      context.drawImage(image, 0, 0);

      if (meme['offline']) {
        var imageData = context.getImageData(0, 0, image.width, image.height);
        var data = imageData.data;

        for (var i = 0; i < data.length; i += 4) {
          var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          data[i] = brightness; // red
          data[i + 1] = brightness; // green
          data[i + 2] = brightness; // blue
        }

        // overwrite original image
        context.putImageData(imageData, 0, 0);
      }

      context.font = "100px Impact";
      context.fillStyle = 'white';
      context.strokeStyle = 'black';
      context.lineWidth = 4;
      context.textAlign = 'center';

      // Write top line 
      if (meme.top) {
        context.fillText(meme.top.toUpperCase(), context.canvas.width / 2, 90, context.canvas.width - 10);
        context.strokeText(meme.top.toUpperCase(), context.canvas.width / 2, 90, context.canvas.width - 10);
      }

      // Write bottom line 
      if (meme.bottom) {
        context.fillText(meme.bottom.toUpperCase(), context.canvas.width / 2, context.canvas.height - 10, context.canvas.width - 10);
        context.strokeText(meme.bottom.toUpperCase(), context.canvas.width / 2, context.canvas.height - 10, context.canvas.width - 10);
      }
    };

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = draw.bind(this, []);
    image.src = meme.template;
  }
}
