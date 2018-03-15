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

      context.font = "100px Arial";
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
    image.onload = draw.bind(this, []);
    image.src = meme.template;
  }

}
