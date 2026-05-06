import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Pelicula } from '../../../models/pelicula.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pelicula-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class PeliculaCardComponent {
  @Input() pelicula!: Pelicula;
  @Output() cardClick = new EventEmitter<number>();

  onCardClick(): void {
    this.cardClick.emit(this.pelicula.id);
  }
}