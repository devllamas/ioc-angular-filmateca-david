import { Component, OnInit } from '@angular/core';
import { PeliculaService } from './services/pelicula.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1>Prova del servei</h1>
      <p>Obre la consola per veure els resultats</p>
    </div>
  `
})
export class AppComponent implements OnInit {
  constructor(private peliculaService: PeliculaService) {}

  ngOnInit() {
    console.log('Estat inicial:', this.peliculaService.estat());

    this.peliculaService.obtenirPopulars();

    // Espera 1 segon i mostra resultats
    setTimeout(() => {
      console.log('Estat final:', this.peliculaService.estat());
      console.log('Elements:', this.peliculaService.pelicules());
      console.log('Error:', this.peliculaService.error());
    }, 1500);
  }
}