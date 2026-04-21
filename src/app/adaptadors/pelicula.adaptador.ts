import { PeliculaCataleg, PeliculaApiResponse } from '../models/pelicula.model';

export function adaptarPeliculaApi(apiPelicula: PeliculaApiResponse): PeliculaCataleg {
  return {
    id: apiPelicula.id,
    nom: apiPelicula.nom,
    descripcio: apiPelicula.descripcio,
    categoria: apiPelicula.categoria,
    preu: apiPelicula.preu,
    imatge: apiPelicula.imatge,
    esPopular: apiPelicula.popular,  // Canvi de nom
    stock: apiPelicula.stock,
    dataAfegit: new Date(),  // Camp afegit
    director: apiPelicula.director,
    any: apiPelicula.any,
    durada: apiPelicula.durada
  };
}


export function adaptarPeliculesApi(apiPelicules: PeliculaApiResponse[]): PeliculaCataleg[] {
  return apiPelicules.map(adaptarPeliculaApi);
}

export function peliculaBuida(): PeliculaCataleg {
  return {
    id: '',
    nom: '',
    descripcio: '',
    categoria: '',
    preu: 0,
    imatge: 'https://via.placeholder.com/300x200?text=Sense+imatge',
    esPopular: false,
    stock: 0,
    dataAfegit: new Date(),
    director: '',
    any: 0,
    durada: 0
  };
}