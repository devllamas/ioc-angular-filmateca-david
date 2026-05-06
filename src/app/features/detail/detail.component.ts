import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  pelicula: Pelicula | null = null;
  loading = true;
  error = '';
  peliculaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private PeliculaService: PeliculaService
  ) {}

  ngOnInit(): void {
    // Capturar paràmetre ID de la ruta
    this.route.params.subscribe(params => {
      this.peliculaId = +params['id'];  // Convertir a number
      this.loadItem(this.peliculaId);
    });
  }

  loadItem(id: number): void {
    this.loading = true;
    this.PeliculaService.getItemById(id).subscribe({
      next: (data) => {
        this.pelicula = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Element no trobat';
        this.loading = false;
        console.error(err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  goToNext(): void {
    const nextId = this.peliculaId + 1;
    this.router.navigate(['/pelicula', nextId]);
  }

  goToPrevious(): void {
    if (this.peliculaId > 1) {
      const prevId = this.peliculaId - 1;
      this.router.navigate(['/pelicula', prevId]);
    }
  }
}