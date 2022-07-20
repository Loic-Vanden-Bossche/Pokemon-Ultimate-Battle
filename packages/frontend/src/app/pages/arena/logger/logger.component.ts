import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
})
export class LoggerComponent {
  @Input() logs: string[] = [];
}
