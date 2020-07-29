import { Component, OnInit, ViewEncapsulation, AfterContentInit } from '@angular/core';
import { dd } from '../../data/density.data';
import * as d3 from 'd3';

@Component({
  selector: 'app-area-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit, AfterContentInit {
  margin = { top: 30, right: 30, bottom: 30, left: 50 };
  width = 460 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;
  svg = null;
  datum = [];

  // tslint:disable-next-line: typedef
  ngAfterContentInit() {
    this.svg = d3.select('#my_dataviz').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  constructor() {
    d3.csv('assets/files/density.csv', (data: any) => {
      this.datum.push(data);
      return null;
    }).then(res => {
      // add the x Axis
      const x = d3.scaleLinear().domain([0, 1000]).range([0, this.width]);
      this.svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(x));
      // add the y Axis
      const y = d3.scaleLinear().range([this.height, 0]).domain([0, 0.01]);
      this.svg.append('g').call(d3.axisLeft(y));
      // Compute kernel density estimation
      const kde = this.kernelDensityEstimator(this.kernelEpanechnikov(7), x.ticks(40));
      const density = kde(this.datum.map((d) => d.price));
      // Plot the area
      this.svg.append('path')
        .attr('class', 'mypath')
        .datum(density)
        .attr('fill', '#0da6ff')
        .attr('opacity', '.9')
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('stroke-linejoin', 'round')
        .attr('d', d3.line()
          .curve(d3.curveBasis)
          .x((d) => x(d[0]))
          .y((d) => y(d[1]))
        );
    });
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  kernelDensityEstimator = (kernel, X) => {
    return (V) => {
      return X.map((x) => {
        return [x, d3.mean(V, (v: any) => kernel(x - v))];
      });
    };
  }

  kernelEpanechnikov = (k) => {
    return (v) => {
      return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
  }
}
