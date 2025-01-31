import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page-404/page-404.component';
import { UserComponent } from './pages/user/user.component';
import { NewUserComponent } from './pages/new-user/new-user.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeComponent},
    {path: 'user/:id', component: UserComponent},
    {path: 'newuser', component: NewUserComponent},
    {path: '**', component: Page404Component}
];
