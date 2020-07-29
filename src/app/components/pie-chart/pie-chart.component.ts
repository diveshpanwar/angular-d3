import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, AfterViewInit {
  svg = null;
  width = 450;
  height = 450;
  margin = 40;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  radius = Math.min(this.width, this.height) / 2 - this.margin;


  ngAfterViewInit(): void {
    // append the svg object to the div called 'my_dataviz'
    this.svg = d3.select('#pie-chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

    // Create dummy data
    const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };
    const datas = ['a', 'b', 'c', 'd', 'e'];
    // set the color scale
    const color = d3.scaleOrdinal()
      .domain(datas)
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56']);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .value((d: any) => d.value);
    const dataReady = pie(d3.entries(data));
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll('mySlices')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function (d) { return (color(d.data.key)); })
      .attr('stroke', 'black')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Now add the annotation. Use the centroid method to get the best coordinates
    this.svg
      .selectAll('mySlices')
      .data(dataReady)
      .enter()
      .append('text')
      .text(function (d) { return 'grp ' + d.data.key })
      .attr('transform', function (d) { return 'translate(' + arcGenerator.centroid(d) + ')'; })
      .style('text-anchor', 'middle')
      .style('font-size', 17);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
