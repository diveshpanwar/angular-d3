import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterContentInit {

  svg = null;
  // set the dimensions and margins of the graph
  margin = { top: 30, right: 30, bottom: 70, left: 60 };
  width = 460 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;

  ngAfterContentInit() {
    // append the svg object to the body of the page
    this.svg = d3.select('#bar-chart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  constructor() {
    d3.csv('assets/files/barchart.csv').then(data => {

      // sort data
      data.sort((b: any, a: any) => {
        return a.Value - b.Value;
      });

      // X axis
      const x = d3.scaleBand()
        .range([0, this.width])
        .domain(data.map((d) => d.Country))
        .padding(0.2);
      this.svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, 13000])
        .range([this.height, 0]);
      this.svg.append('g')
        .call(d3.axisLeft(y));

      // Bars
      this.svg.selectAll('mybar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => x(d.Country))
        .attr('y', (d) => y(d.Value))
        .attr('width', x.bandwidth())
        .attr('height', (d) => this.height - y(d.Value))
        .attr('fill', '#69b3a2');

    });
  }

  ngOnInit(): void {
  }

}
