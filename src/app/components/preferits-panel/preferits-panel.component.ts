import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PreferitsService, Preferit } from '../../services/preferits.service';

@Component({
  selector: 'app-preferits-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preferits-panel.component.html',
  styleUrl: './preferits-panel.component.scss'
})
export class PreferitsPanelComponent implements OnInit {
  preferitSeleccionat: Preferit | null = null;

  constructor(
    public preferitsService: PreferitsService
  ) {}

  ngOnInit(): void {}

  seleccionarPreferit(preferit: Preferit): void {
    this.preferitSeleccionat = preferit;

  }

  eliminarPreferit(peliculaId: string): void {
    this.preferitsService.eliminarPreferit(peliculaId);
    if (this.preferitSeleccionat?.peliculaId === peliculaId) {
      this.preferitSeleccionat = null;
    }
  }

  tancarPanel(): void {
    this.preferitSeleccionat = null;
  }
}