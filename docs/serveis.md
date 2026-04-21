# Configuració de serveis

## API Mock (desenvolupament)

### Arrencar el servidor

```bash
json-server --watch tools/api/cataleg.json --port 4301 --delay 600
```

### Endpoints disponibles

- `GET /pelicules` - Retorna tots els elements
- `GET /pelicules?popular=true` - Filtra elements populars
- `GET /pelicules?q=Arduino` - Cerca elements per nom
- `GET /pelicules/:id` - Obté un element per ID

### Configuració

- **Port:** 4301
- **Latència simulada:** 600ms
- **Fitxer de dades:** `tools/api/cataleg.json`

## Canviar a API real

Per utilitzar una API real, modifiqueu `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.exemple.com',
  apiKey: 'LA_VOSTRA_CLAU_API' // Si cal autenticació
};
```

## PeliculaService

### Responsabilitats

- Comunicació HTTP amb l'API de catàleg
- Gestió d'estats (inicial, carregant, èxit, error)
- Transformació de respostes amb adaptadors
- Gestió centralitzada d'errors

### Mètodes públics

#### obtenirPopulars(): void

Carrega elements populars del catàleg.

**Flux:**
1. Canvia estat a `'carregant'`
2. Fa petició GET a `/pelicules?popular=true`
3. Adapta resposta amb `adaptarPeliculesApi`
4. Actualitza signals amb dades i estat `'exit'`
5. En cas d'error, actualitza error i estat `'error'`

#### cercar(terme: string): void

Cerca pel·lícules per terme de cerca.

**Paràmetres:**
- `termeCerca`: Text a cercar (mínim 2 caràcter)

**Comportament:**
- Si terme buit: carrega populars
- Si terme vàlid: cerca amb `/pelicules?q={terme}`

#### codiDisponible(codi: string): Promise<boolean>

Comprova si un codi de pel·licula està disponible (no existeix).

**Ús:** Validador asíncron per formularis

**Retorna:** `true` si el codi està disponible, `false` si ja existeix

#### reiniciar(): void

Neteja estat i pel·lícules del servei.

### Signals exposades (només lectura)

- `pelicules()`: Array d'elements actuals
- `estat()`: Estat actual del servei
- `error()`: Missatge d'error (si n'hi ha)

### Gestió d'errors

Errors HTTP es transformen en missatges comprensibles:

| Codi | Missatge |
|------|----------|
| 0 | "No es pot connectar al servidor..." |
| 404 | "Endpoint no trobat..." |
| 500 | "Error intern del servidor" |
| Altres | "Error desconegut (XXX)..." |

### Exemple d'ús

```typescript
constructor(private peliculaService: PeliculaService) {}

ngOnInit() {
  // Carregar populars
  this.peliculaService.obtenirPopulars();

  // Observar estat
  effect(() => {
    console.log('Estat:', this.peliculaService.estat());
    console.log('Pelicules:', this.peliculaService.pelicules());
  });
}
```