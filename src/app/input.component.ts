import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <input [(ngModel)]="name" />
    <div>
    <span>{{name}}</span>
    </div>
  `,
  styles: []
})
export class InputComponent {
  public name = '';
  constructor() { }
}
