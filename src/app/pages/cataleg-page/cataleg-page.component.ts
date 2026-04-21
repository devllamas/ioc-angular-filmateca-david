import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculaService } from '../../services/pelicula.service';
import { FormulariCercaComponent } from '../../components/formulari-cerca/formulari-cerca.component';

@Component({
  selector: 'app-cataleg-page',
  standalone: true,
  imports: [CommonModule, FormulariCercaComponent],
  templateUrl: './cataleg-page.component.html',
  styleUrl: './cataleg-page.component.scss'
})
export class CatalegPageComponent implements OnInit {
  constructor(public peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.peliculaService.obtenirPopulars();
  }

  reintentar(): void {
    this.peliculaService.obtenirPopulars();
  }
}