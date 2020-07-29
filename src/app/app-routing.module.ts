import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { BubbleChartComponent } from './components/bubble-chart/bubble-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'area-chart', component: AreaChartComponent },
  { path: 'heat-map', component: HeatMapComponent },
  { path: 'bubble-chart', component: BubbleChartComponent },
  { path: 'bar-chart', component: BarChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
