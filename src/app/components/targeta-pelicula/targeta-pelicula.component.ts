import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../models/pelicula.model';

@Component({
  selector: 'app-targeta-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './targeta-pelicula.component.html',
  styleUrl: './targeta-pelicula.component.scss'
})
export class TargetaPeliculaComponent {
  @Input({required: true}) pelicula!: Pelicula;
  
}
