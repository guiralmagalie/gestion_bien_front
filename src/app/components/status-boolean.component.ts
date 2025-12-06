import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-status-boolean',
  standalone: true,
  imports: [NgClass, NgIf],
  template: `
    <span 
      [ngClass]="value ? 'active-yes' : 'active-no'"
      class="status-text"
    >
      {{ value ? 'Oui' : 'Non' }}
    </span>
  `,
  styles: [`
    .status-text {
      font-weight: 600;
    }
    .active-yes {
      color: #2e7d32; 
    }
    .active-no {
      color: #c62828; 
    }
  `]
})
export class StatusBooleanComponent {
  @Input() value!: boolean;
}
