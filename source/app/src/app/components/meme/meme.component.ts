import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { Meme } from '../models';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {
  @Input() meme: Meme;
  @ViewChild('meme') canvas: ElementRef;
  
  constructor(private el: ElementRef) { }

  ngOnInit() {
    var context = this.canvas.nativeElement.getContext("2d");

    var draw = function () {
      context.canvas.width = image.width;
      context.canvas.height = image.height;
      context.drawImage(image, 0, 0);

      context.font = "100px Arial";
      context.fillStyle = 'white';
      context.strokeStyle = 'black';
      context.lineWidth = 4;
      context.textAlign = 'center';

      // Write top line 
      if (this.meme.top) {
        context.fillText(this.meme.top.toUpperCase(), context.canvas.width / 2, 90, context.canvas.width - 10);
        context.strokeText(this.meme.top.toUpperCase(), context.canvas.width / 2, 90, context.canvas.width - 10);
      }

      // Write bottom line 
      if (this.meme.bottom) {
        context.fillText(this.meme.bottom.toUpperCase(), context.canvas.width / 2, context.canvas.height - 10, context.canvas.width - 10);
        context.strokeText(this.meme.bottom.toUpperCase(), context.canvas.width / 2, context.canvas.height - 10, context.canvas.width - 10);
      }
    };

    var image = new Image();
    image.onload = draw.bind(this, []);
    image.src = this.meme.template;

    // if (this.showRefresh) {
    //   var button = document.createElement("button");
    //   button.attributes["type"] = "button";
    //   button.textContent = "Refresh";
    //   button.onclick = draw.bind(this, []);
    //   element.append(button);
    // }
  }

}
