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