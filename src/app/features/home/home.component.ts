import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Pelicula[] = [];
  loading = true;
  error = '';

  constructor(
    private peliculaService: PeliculaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.peliculaService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error carregant pel·lícules.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  viewDetail(id: number): void {
    this.router.navigate(['/pelicula', id]);
  }

  trackByPeliculaId(index: number, item: Pelicula): number {
    return item.id;
  }
}