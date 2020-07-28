import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'area-chart', component: AreaChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
