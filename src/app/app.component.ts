import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TargetaPeliculaComponent } from './components/targeta-pelicula/targeta-pelicula.component';
import { LlistaPeliculesComponent } from './components/llista-pelicules/llista-pelicules.component';
import { Pelicula } from './models/pelicula.model';
import { PELICULES_MOCK } from './mocks/dades-mock';
import { BarraCercaComponent } from './components/barra-cerca/barra-cerca.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TargetaPeliculaComponent, LlistaPeliculesComponent, BarraCercaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ioc-angular-filmateca-david';
  pelicules: Pelicula[] = PELICULES_MOCK
}
