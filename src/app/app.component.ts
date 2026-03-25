import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TargetaPeliculaComponent } from './components/targeta-pelicula/targeta-pelicula.component';
import { LlistaPeliculesComponent } from './components/llista-pelicules/llista-pelicules.component';
import { Pelicula } from './models/pelicula.model';
import { PELICULES_MOCK } from './mocks/dades-mock';
import { BarraCercaComponent } from './components/barra-cerca/barra-cerca.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TargetaPeliculaComponent, LlistaPeliculesComponent, BarraCercaComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ioc-angular-filmateca-david';
  pelicules: Pelicula[] = PELICULES_MOCK;
  peliculesFiltrades: Pelicula[] = this.pelicules;
  textCercaActual: string = '';

  filtrarPelicules(textCerca: string): void {
    this.textCercaActual = textCerca;
    if (!textCerca) {
      this.peliculesFiltrades = this.pelicules;
    } else {
      const cercaMinuscules = textCerca.toLocaleLowerCase();
      this.peliculesFiltrades = this.pelicules.filter(pelicula => pelicula.titol.toLocaleLowerCase().includes(cercaMinuscules)) ||
        this.pelicules.filter(pelicula => pelicula.director.toLocaleLowerCase().includes(cercaMinuscules)) ||
        this.pelicules.filter(pelicula => pelicula.sinopsis.toLocaleLowerCase().includes(cercaMinuscules)) ||
        this.pelicules.filter(pelicula => pelicula.any.toString().includes(cercaMinuscules));
    }
  }
}
