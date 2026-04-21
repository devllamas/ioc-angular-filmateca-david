import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula.service';
import { codiDisponibleValidator } from '../../validadors/codi-disponible.validator';
import { debounceTime, filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-formulari-cerca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulari-cerca.component.html',
  styleUrl: './formulari-cerca.component.scss'
})
export class FormulariCercaComponent implements OnInit {
  formulariCerca!: FormGroup;
  
  get control() {
    return this.formulariCerca.get('termeCerca');
  }

  constructor(
    private fb: FormBuilder,
    private peliculaService: PeliculaService
  ) {}

  ngOnInit(): void {
    this.formulariCerca = this.fb.group({
      termeCerca: ['', 
        [Validators.minLength(2), Validators.maxLength(50)], 
        [codiDisponibleValidator(this.peliculaService)]     
      ]
    });
    this.formulariCerca.get('termeCerca')?.valueChanges
    .pipe(
      debounceTime(400), // 400ms de debounce
    )
    .subscribe(valor => {
      if (this.formulariCerca.valid) {
        this.peliculaService.cercar(valor);
      }
      else if (this.control?.pending) {
      this.control.statusChanges.pipe(
        filter(status => status === 'VALID'),
        first() 
      ).subscribe(() => this.cercar());
    }
    }); 
  }

  cercar(): void {
    const terme = this.formulariCerca.get('termeCerca')?.value;
    this.peliculaService.cercar(terme);
  }

  netejar(): void {
    this.formulariCerca.reset();
    this.peliculaService.obtenirPopulars();
  }

  get estaCarregant(): boolean {
    return this.peliculaService.estat() === 'carregant';
  }
  

  get termeInvalid(): boolean {
  const control = this.control;
  if (!control || (!control.dirty && !control.touched)) return false;


  return control.hasError('minlength') || control.hasError('maxlength');
}

  get estaValidant(): boolean {
  return this.control?.status === 'PENDING';
  }

  get missatgeError(): string {
    const control = this.formulariCerca.get('termeCerca');
    if (control?.hasError('minlength')) {
      return 'Mínim 2 caràcters';
    }
    if (control?.hasError('maxlength')) {
      return 'Màxim 50 caràcters'; 
    }
    if (control?.hasError('sensResultats')) {
    return 'No s’han trobat elements que coincideixin';
  }
    return '';
  }
}