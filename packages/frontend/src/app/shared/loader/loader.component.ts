import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  @Input() size: number = 32;
  @Input() color: string = 'black';

  getCircleStyle() {
    return {
      width: `${this.size}px`,
      height: `${this.size/2}px`,
    }
  }

  getCircleInnerStyle() {
    return {
      border: `${this.size/8}px solid ${this.color}`,
      "border-right": `${this.size/8}px solid transparent`,
      "border-bottom": `${this.size/8}px solid transparent`,
    }
  }

}
