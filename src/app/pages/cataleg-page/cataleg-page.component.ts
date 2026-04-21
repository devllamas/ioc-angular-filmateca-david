import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculaService } from '../../services/pelicula.service';
import { PreferitsService } from '../../services/preferits.service';  
import { FormulariCercaComponent } from '../../components/formulari-cerca/formulari-cerca.component';
import { PreferitsPanelComponent } from '../../components/preferits-panel/preferits-panel.component';  
import { PeliculaCataleg } from '../../models/pelicula.model';  

@Component({
  selector: 'app-cataleg-page',
  standalone: true,
  imports: [CommonModule, FormulariCercaComponent, PreferitsPanelComponent],  
  templateUrl: './cataleg-page.component.html',
  styleUrl: './cataleg-page.component.scss'
})
export class CatalegPageComponent implements OnInit {
  constructor(
    public peliculaService: PeliculaService,
    public preferitsService: PreferitsService  
  ) {}

  ngOnInit(): void {
    this.peliculaService.obtenirPopulars();
  }

  reintentar(): void {
    this.peliculaService.obtenirPopulars();
  }

  togglePreferit(pelicula: PeliculaCataleg): void {
    if (this.preferitsService.esPreferit(pelicula.id)) {
      this.preferitsService.eliminarPreferit(pelicula.id);
    } else {
      this.preferitsService.afegirPreferit(pelicula.id, pelicula.nom);
    }
  }
}