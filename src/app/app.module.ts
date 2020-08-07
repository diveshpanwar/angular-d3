import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './modules/mat/mat.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { BubbleChartComponent } from './components/bubble-chart/bubble-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AngularD3GraphLibModule } from 'angular-d3-graphs';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AreaChartComponent,
    HeatMapComponent,
    BubbleChartComponent,
    BarChartComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    HttpClientModule,
    AngularD3GraphLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
