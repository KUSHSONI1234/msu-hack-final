import { Routes } from '@angular/router';
import { PostConfessionComponent } from './components/post-confession/post-confession.component';
import { SecretMessageComponent } from './components/secret-message/secret-message.component';
import { AboutComponent } from './components/about/about.component';
import { ViewSecretComponent } from './components/view-secret/view-secret.component';

export const routes: Routes = [
    {
        path:'post-confession',
        component:PostConfessionComponent
    },
    {
        path:'secret-msg',
        component:SecretMessageComponent
    },
    {
        path:'about',
        component:AboutComponent
    },
    { path: '', redirectTo: 'about', pathMatch: 'full' },
    { path: 'secret/:id', component: ViewSecretComponent }, // ✅ Route to fetch & show secret messages
    { path: '**', redirectTo: '/secret-message' }
];
