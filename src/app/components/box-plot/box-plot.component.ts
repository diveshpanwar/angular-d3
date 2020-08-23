import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-box-plot',
  templateUrl: './box-plot.component.html',
  styleUrls: ['./box-plot.component.scss']
})

export class BoxPlotComponent implements OnInit, AfterViewInit {
  // set the dimensions and margins of the graph
  margin = { top: 10, right: 30, bottom: 30, left: 40 };
  width = 460 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;
  svg = null;
  // append the svg object to the body of the page

  constructor() {
    d3.csv('https://raw.githubusercontent.com/diveshpanwar/d3-graph-data/master/box-plot.csv').then( (data) => {

      // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
      const sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key((d: any) => d.Species)
        .rollup((d: any[]): any => {
          const q1 = d3.quantile(d.map( (g) =>  g.Sepal_Length).sort(d3.ascending), .25);
          const median = d3.quantile(d.map( (g) =>  g.Sepal_Length).sort(d3.ascending), .5);
          const q3 = d3.quantile(d.map( (g) =>  g.Sepal_Length).sort(d3.ascending), .75);
          const interQuantileRange = q3 - q1;
          const min = q1 - 1.5 * interQuantileRange;
          const max = q3 + 1.5 * interQuantileRange;
          return ({ q1, median, q3, interQuantileRange, min, max });
        })
        .entries(data);

      // Show the X scale
      const x = d3.scaleBand()
        .range([0, this.width])
        .domain(['setosa', 'versicolor', 'virginica'])
        .paddingInner(1)
        .paddingOuter(.5);
      this.svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(x));

      // Show the Y scale
      const y = d3.scaleLinear()
        .domain([3, 9])
        .range([this.height, 0]);
      this.svg.append('g').call(d3.axisLeft(y));

      // Show the main vertical line
      this.svg
        .selectAll('vertLines')
        .data(sumstat)
        .enter()
        .append('line')
        .attr('x1',  (d) => (x(d.key)))
        .attr('x2',  (d) => (x(d.key)))
        .attr('y1',  (d) => (y(d.value.min)))
        .attr('y2',  (d) => (y(d.value.max)))
        .attr('stroke', 'black')
        .style('width', 40);

      // rectangle for the main box
      const boxWidth = 100;
      this.svg
        .selectAll('boxes')
        .data(sumstat)
        .enter()
        .append('rect')
        .attr('x',  (d) => (x(d.key) - boxWidth / 2))
        .attr('y',  (d) => (y(d.value.q3)))
        .attr('height',  (d) => (y(d.value.q1) - y(d.value.q3)))
        .attr('width', boxWidth)
        .attr('stroke', 'black')
        .style('fill', '#69b3a2');

      // Show the median
      this.svg
        .selectAll('medianLines')
        .data(sumstat)
        .enter()
        .append('line')
        .attr('x1', (d) => (x(d.key) - boxWidth / 2))
        .attr('x2', (d) => (x(d.key) + boxWidth / 2))
        .attr('y1', (d) => (y(d.value.median)))
        .attr('y2', (d) => (y(d.value.median)))
        .attr('stroke', 'black')
        .style('width', 80);

      // Add individual points with jitter
      const jitterWidth = 50;
      this.svg
        .selectAll('indPoints')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx',  (d) => (x(d.Species) - jitterWidth / 2 + Math.random() * jitterWidth))
        .attr('cy',  (d) => (y(d.Sepal_Length)))
        .attr('r', 4)
        .style('fill', 'white')
        .attr('stroke', 'black');
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.svg = d3.select('#box-plot')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // Read the data and compute summary statistics for each specie
  }

}
