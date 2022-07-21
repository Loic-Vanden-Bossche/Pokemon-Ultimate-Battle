import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit {
  @Input() playing = true;
  @Output() playSwitched: EventEmitter<boolean> = new EventEmitter<boolean>();

  currentTime = new Date(0, 0, 0);
  seconds = 0;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent,
  ) {
    if (event.key === 'Escape') {
      this.switchPlaying();
    }
  }

  ngOnInit() {
    this.initializeTimer();
  }

  switchPlaying() {
    this.playSwitched.emit(!this.playing);
  }

  initializeTimer() {
    this.currentTime = new Date(0, 0, 0);
    this.seconds = 0;
    setInterval(() => {
      if (this.playing) {
        this.seconds++;
        this.currentTime = new Date(0, 0, 0, 0, 0, this.seconds);
        this.currentTime.setSeconds(this.seconds);
      }
    }, 1000);
  }
}
