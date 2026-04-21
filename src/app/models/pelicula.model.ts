export interface PeliculaCataleg {
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


export interface PeliculaApiResponse {
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

export interface PeliculaCercaResponse {
  pelicules: PeliculaApiResponse[];
  total: number;
}