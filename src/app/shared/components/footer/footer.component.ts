import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  // Optimització per a components estàtics
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}