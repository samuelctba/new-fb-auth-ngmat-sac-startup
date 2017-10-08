import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { AppComponent } from '../app/app.component';
import { AuthGuard } from '../core/auth.guard';


const APP_ROUTES: Routes = [
    { path: "", component: AppComponent },
    { path: "withGuard", component: AppComponent, canActivate: [AuthGuard] },
    { path: "**", redirectTo: '/', pathMatch: 'full' }
]

const config: ExtraOptions = {
    useHash: true,
  };

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule],
    providers:[AuthGuard]
})
export class AppRoutingModule { }