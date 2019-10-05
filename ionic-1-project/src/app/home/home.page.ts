import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    text = 'This is a default text';
    constructor() {
    }
    onClick(): void {
      this.text = 'Changed';
    }
}
