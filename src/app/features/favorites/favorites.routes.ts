import { Routes } from '@angular/router';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { FavoritesSettingsComponent } from './favorites-settings/favorites-settings.component';

export const favoritesRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: FavoritesListComponent },
  { path: 'settings', component: FavoritesSettingsComponent }
];