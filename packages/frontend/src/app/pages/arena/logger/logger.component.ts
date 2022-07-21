import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  animations: [
    trigger('onNewLog', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class LoggerComponent implements OnChanges {
  @Input() logs: string[] = [];

  @ViewChild('logsContainer') logsContainer: null | ElementRef = null;

  ngOnChanges() {
    setTimeout(() => {
      if (this.logsContainer) {
        this.logsContainer.nativeElement.scrollTop =
          this.logsContainer.nativeElement.scrollHeight;
      }
    }, 0);
  }
}
