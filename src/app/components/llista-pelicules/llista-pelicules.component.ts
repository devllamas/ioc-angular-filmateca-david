import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../models/pelicula.model';
import { TargetaPeliculaComponent } from '../targeta-pelicula/targeta-pelicula.component';

@Component({
  selector: 'app-llista-pelicules',
  standalone: true,
  imports: [CommonModule, TargetaPeliculaComponent],
  templateUrl: './llista-pelicules.component.html',
  styleUrl: './llista-pelicules.component.scss'
})
export class LlistaPeliculesComponent {
  @Input({required: true}) pelicules!: Pelicula[];

  trackById(index: number, pelicula: Pelicula): number {
    return pelicula.id;
  }
}
