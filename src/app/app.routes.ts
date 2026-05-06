import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { DetailComponent } from './features/detail/detail.component';
import { LoginComponent } from './features/login/login.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'pelicula/:id', component: DetailComponent },
  { path: 'login', component: LoginComponent },
  //{
      //path: 'favorites',
    //loadChildren: () => import('./features/favorites/favorites.module').then(m => m.FavoritesModule)
  //},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];