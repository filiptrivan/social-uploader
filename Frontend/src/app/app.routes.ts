import { InMemoryScrollingOptions, RouterConfigOptions, Routes } from '@angular/router';
import { LayoutComponent } from './business/layout/layout.component';

const layoutRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/homepage/homepage.component').then(c => c.HomepageComponent),
    },
    {
        path: 'transactions',
        loadComponent: () => import('./pages/transaction/transaction-list.component').then(c => c.TransactionListComponent),
    },
    {
        path: 'successful-transaction',
        loadComponent: () => import('./pages/successful-transaction/successful-transaction.component').then(c => c.SuccessfulTransactionComponent),
    },
];

export const routes: Routes = [
    {
        path: '', 
        component: LayoutComponent,
        children: layoutRoutes,
    },
    { path: 'not-found', loadComponent: () => import('spiderly').then(c => c.NotFoundComponent) },
    { path: '**', redirectTo: 'not-found' },
];

export const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
};

export const routerConfigOptions: RouterConfigOptions = {
    onSameUrlNavigation: 'reload',
};
