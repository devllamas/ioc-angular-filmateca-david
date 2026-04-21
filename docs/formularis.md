## PreferitsPanelComponent

### Funcionalitat

Component amb FormArray dinàmic per gestionar notes de preferits amb persistència a localStorage.

### FormArray dinàmic

```typescript
formulariNotes = this.fb.group({
  notes: this.fb.array([])  // Array dinàmic de controls
});
```

**Comportament:**
1. Carrega notes existents al FormArray
2. Afegeix camp buit al final per noves notes
3. Validació: mínim 3 caràcters per nota
4. Persiste després de cada modificació

### Validacions

| Camp | Validació | Missatge |
|------|-----------|----------|
| Nota | `required, minLength(3)` | Validació visual (borde vermell) |

### Mètodes principals

- `seleccionarPreferit()`: Carrega notes del preferit al FormArray
- `afegirNota()`: Afegeix nota i recrea FormArray
- `eliminarNota()`: Elimina nota i actualitza FormArray

### Integració amb servei

```typescript
// Afegir nota
this.preferitsService.afegirNota(peliculaId, nota);

// Recarregar dades actualitzades
const actualitzat = this.preferitsService.obtenirPreferit(peliculaId);
this.seleccionarPreferit(actualitzat);
```