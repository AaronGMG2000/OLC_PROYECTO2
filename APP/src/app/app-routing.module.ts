import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: 'Analizador',
    component: IndexComponent,
  },
  { path: '', redirectTo: '/Analizador', pathMatch: 'full' },
  { path: '*', redirectTo: '/Analizador', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
    {
      useHash: true,
      onSameUrlNavigation: 'ignore',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
