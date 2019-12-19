import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
    },
    {
        path: 'diary',
        component: DiaryComponent,
    },
    {
        path: 'contacts',
        component: ContactsComponent,
    },
    {
        path: '**',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
