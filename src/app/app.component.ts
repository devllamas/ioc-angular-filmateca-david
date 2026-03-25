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

  isDarkMode: boolean = false;


  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  filtrarPelicules(textCerca: string): void {
    this.textCercaActual = textCerca;
    if (!textCerca) {
      this.peliculesFiltrades = this.pelicules;
    } else {
      const cercaMinuscules = textCerca.toLocaleLowerCase();
      this.peliculesFiltrades = this.pelicules.filter(pelicula => 
          pelicula.titol.toLowerCase().includes(cercaMinuscules) ||
          pelicula.sinopsis.toLowerCase().includes(cercaMinuscules) ||
          pelicula.director.toLowerCase().includes(cercaMinuscules) ||
          pelicula.any.toString().toLowerCase().includes(cercaMinuscules)
        );  
    }
  }
}
