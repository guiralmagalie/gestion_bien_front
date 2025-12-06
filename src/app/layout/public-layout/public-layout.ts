import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="public-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  //styleUrls: ['./public-layout.css']
})
export default class PublicLayout {}
