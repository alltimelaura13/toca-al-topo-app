import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TopoComponent } from './game/topo/topo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopoComponent],
  templateUrl: './app.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  title: string = '¡¡Tocar el Topo!!';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
