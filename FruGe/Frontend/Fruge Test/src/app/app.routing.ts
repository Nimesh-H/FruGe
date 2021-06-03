import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AboutUsComponent } from './aboutus';
import { FruitsComponent } from './fruits/fruits.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { LowestPriceComponent } from './lowest-price/lowest-price.component';

const routes: Routes = [
    { path: '', component: GuestPageComponent  },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'fruits', component: FruitsComponent },
    { path: 'vegetables', component: VegetablesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'lowest', component: LowestPriceComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);