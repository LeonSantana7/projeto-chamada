import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'chamadas',
        loadComponent: () =>
            import('./pages/chamadas/chamadas.component').then(m => m.ChamadaComponent)
    },
    {
        path: '',
        redirectTo: 'chamadas',
        pathMatch: 'full'
    }
];
