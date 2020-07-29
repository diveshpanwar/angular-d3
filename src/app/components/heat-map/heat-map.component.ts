import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent implements OnInit, AfterViewInit {
  svg = null;
  margin = { top: 80, right: 25, bottom: 30, left: 40 };
  width = 450 - this.margin.left - this.margin.right;
  height = 450 - this.margin.top - this.margin.bottom;

  ngAfterViewInit() {
    this.svg = d3.select('#heatmap')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  constructor() {
    d3.csv('assets/files/heatmap.csv').then(data => {
      console.log(data);
      // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
      const myGroups = d3.map(data, (d) => d.group).keys();
      const myVars = d3.map(data, (d) => d.variable).keys();

      // Build X scales and axis:
      const x = d3.scaleBand()
        .range([0, this.width])
        .domain(myGroups)
        .padding(0.05);
      this.svg.append('g')
        .style('font-size', 15)
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(x).tickSize(0))
        .select('.domain').remove();

      // Build Y scales and axis:
      const y = d3.scaleBand()
        .range([this.height, 0])
        .domain(myVars)
        .padding(0.05);
      this.svg.append('g')
        .style('font-size', 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select('.domain').remove();
      // Build color scale
      const myColor = d3.scaleSequential(d3.interpolatePiYG)
        .interpolator(d3.interpolateInferno)
        .domain([1, 100]);
      // create a tooltip
      const tooltip = d3.select('#heatmap')
        .append('div')
        .style('opacity', 0)
        .attr('class', 'tooltip')
        .style('background-color', 'white')
        .style('border', 'solid')
        .style('border-width', '2px')
        .style('border-radius', '5px')
        .style('padding', '5px');
      // Three function that change the tooltip when user hover / move / leave a cell
      const mouseover = function (d) {
        tooltip
          .style('opacity', 1);
        d3.select(this)
          .style('stroke', 'black')
          .style('opacity', 1);
      };

      const mousemove = function (d) {
        tooltip
          .html('The exact value of<br>this cell is: ' + d.value)
          .style('left', (d3.mouse(this)[0] + 70) + 'px')
          .style('top', (d3.mouse(this)[1]) + 'px');
      };

      const mouseleave = function (d) {
        tooltip
          .style('opacity', 0);
        d3.select(this)
          .style('stroke', 'none')
          .style('opacity', 0.8);
      };

      this.svg.selectAll()
        .data(data, (d) => d.group + ':' + d.variable)
        .enter()
        .append('rect')
        .attr('x', (d) => x(d.group))
        .attr('y', (d) => y(d.variable))
        .attr('rx', 4)
        .attr('ry', 4)
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .style('fill', (d) => myColor(d.value))
        .style('stroke-width', 4)
        .style('stroke', 'none')
        .style('opacity', 0.8)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave);


      // Add title to graph
      this.svg.append('text')
        .attr('x', 0)
        .attr('y', -50)
        .attr('text-anchor', 'center')
        .style('font-size', '22px')
        .text('A d3.js HEATMAP');

      // Add subtitle to graph
      this.svg.append('text')
        .attr('x', 0)
        .attr('y', -20)
        .attr('text-anchor', 'center')
        .style('font-size', '14px')
        .style('fill', 'grey')
        .style('max-width', 400)
        .text('DESCRIPTION GOES HERE');

    });

  }

  ngOnInit(): void {
  }

}
