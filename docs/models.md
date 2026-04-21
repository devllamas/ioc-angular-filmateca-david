# Models i adaptadors

## Interfícies principals

### PeliculaCataleg (model intern)

Model utilitzat dins l'aplicació Angular:

```typescript
interface PeliculaCataleg {
    id: string;
    nom: string;
    categoria: string;
    director: string;
    any: number;
    durada: number;
    descripcio: string;
    imatge: string;
    preu: number;
    esPopular: boolean;
    stock: number;
    dataAfegit?: Date;
}
```


### PeliculaApiResponse (resposta API)

Format de les dades que retorna l'API:

```typescript
interface PeliculaApiResponse {
    id: string;
    nom: string;
    categoria: string;
    director: string;
    any: number;
    durada: number;
    descripcio: string;
    preu: number;
    imatge: string;
    popular: boolean;  
    stock: number;
}
```

## Adaptadors

### adaptarPeliculaApi()

Transforma una pelicula de l'API al format intern:

- Canvia `popular` → `esPopular`
- Afegeix `dataAfegit` amb data actual
- Manté la resta de camps

### adaptarPeliculesApi()

Aplica `adaptarPeliculaApi()` a un array d'elements.

### peliculaBuit()

Retorna una pelicula amb valors per defecte per inicialitzar formularis.

## Mapeig de camps

| Camp API | Camp intern | Transformació |
|----------|-------------|---------------|
| `id` | `id` | Cap |
| `nom` | `nom` | Cap |
| `descripcio` | `descripcio` | Cap |
| `categoria` | `categoria` | Cap |
| `preu` | `preu` | Cap |
| `imatge` | `imatge` | Cap |
| `popular` | `esPopular` | Renombrat |
| `stock` | `stock` | Cap |
| — | `dataAfegit` | Afegit (Date actual) |
| `director` | `director` | Cap |
| `any` | `any` | Cap |
| `durada` | `durada` | Cap |