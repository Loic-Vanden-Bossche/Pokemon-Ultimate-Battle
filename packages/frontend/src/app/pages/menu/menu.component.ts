import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  close(): void {
    const close = window.confirm('Are you sure you want to close the window?');
    if (close) {
      window.close();
    }
  }
}
