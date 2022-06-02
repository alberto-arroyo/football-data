import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PlayerComponent } from './player/player.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

const routes: Routes = [
  {path: 'home', component:MenuComponent},
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path:'players', component:PlayerComponent, pathMatch:'full'},
  {path:'player/:id', component: PlayerDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
