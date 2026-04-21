import { Injectable, signal } from '@angular/core';

export interface Preferit {
  peliculaId: string;
  peliculaNom: string;
  notes: string[];
  dataAfegit: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PreferitsService {
  private readonly CLAU_STORAGE = 'preferits-cataleg';
  private readonly preferitsSignal = signal<Preferit[]>([]);

  readonly preferits = this.preferitsSignal.asReadonly();

  constructor() {
    this.carregarPreferits();
  }

  /**
   * Carrega preferits des de localStorage
   */
  private carregarPreferits(): void {
    const dades = localStorage.getItem(this.CLAU_STORAGE);
    if (dades) {
      try {
        const preferits = JSON.parse(dades) as Preferit[];
        // Convertir strings de data a objectes Date
        preferits.forEach(p => p.dataAfegit = new Date(p.dataAfegit));
        this.preferitsSignal.set(preferits);
      } catch (error) {
        console.error('Error carregant preferits:', error);
        this.preferitsSignal.set([]);
      }
    }
  }

  /**
   * Desa preferits a localStorage
   */
  private desarPreferits(): void {
    localStorage.setItem(this.CLAU_STORAGE, JSON.stringify(this.preferitsSignal()));
  }

  /**
   * Afegeix un element als preferits
   */
  afegirPreferit(peliculaId: string, peliculaNom: string): void {
    if (this.esPreferit(peliculaId)) {
      return;
    }

    const nouPreferit: Preferit = {
      peliculaId,
      peliculaNom,
      notes: [],
      dataAfegit: new Date()
    };

    this.preferitsSignal.update(preferits => [...preferits, nouPreferit]);
    this.desarPreferits();
  }

  /**
   * Elimina un element dels preferits
   */
  eliminarPreferit(peliculaId: string): void {
    this.preferitsSignal.update(preferits =>
      preferits.filter(p => p.peliculaId !== peliculaId)
    );
    this.desarPreferits();
  }

  /**
   * Afegeix una nota a un preferit
   */
  afegirNota(peliculaId: string, nota: string): void {
    this.preferitsSignal.update(preferits =>
      preferits.map(p => {
        if (p.peliculaId === peliculaId) {
          return { ...p, notes: [...p.notes, nota] };
        }
        return p;
      })
    );
    this.desarPreferits();
  }

  /**
   * Elimina una nota d'un preferit
   */
  eliminarNota(peliculaId: string, indexNota: number): void {
    this.preferitsSignal.update(preferits =>
      preferits.map(p => {
        if (p.peliculaId === peliculaId) {
          const notesActualitzades = [...p.notes];
          notesActualitzades.splice(indexNota, 1);
          return { ...p, notes: notesActualitzades };
        }
        return p;
      })
    );
    this.desarPreferits();
  }

  /**
   * Comprova si un element és preferit
   */
  esPreferit(peliculaId: string): boolean {
    return this.preferitsSignal().some(p => p.peliculaId === peliculaId);
  }

  /**
   * Obté un preferit per ID
   */
  obtenirPreferit(peliculaId: string): Preferit | undefined {
    return this.preferitsSignal().find(p => p.peliculaId === peliculaId);
  }
}