import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit, AfterViewInit {
  svg = null;
  margin = { top: 10, right: 20, bottom: 30, left: 50 };
  width = 500 - this.margin.left - this.margin.right;
  height = 420 - this.margin.top - this.margin.bottom;

  ngAfterViewInit() {
    this.svg = d3.select('#bubble-chart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  constructor() {
    d3.csv('assets/files/bubble.csv').then(
      data => {

        // Add X axis
        const x = d3.scaleLinear()
          .domain([0, 12000])
          .range([0, this.width]);
        this.svg.append('g')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
          .domain([35, 90])
          .range([this.height, 0]);
        this.svg.append('g')
          .call(d3.axisLeft(y));

        // Add a scale for bubble size
        const z = d3.scaleLinear()
          .domain([200000, 1310000000])
          .range([4, 40]);

        // Add a scale for bubble color
        const myColor = d3.scaleOrdinal()
          .domain(['Asia', 'Europe', 'Americas', 'Africa', 'Oceania'])
          .range(d3.schemeSet2);

        // -1- Create a tooltip div that is hidden by default:
        const tooltip = d3.select('#bubble-chart')
          .append('div')
          .style('opacity', 0)
          .attr('class', 'tooltip')
          .style('background-color', 'black')
          .style('border-radius', '5px')
          .style('padding', '10px')
          .style('color', 'white');

        // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
        const showTooltip = function (d) {
          tooltip
            .transition()
            .duration(200);
          tooltip
            .style('opacity', 1)
            .html('Country: ' + d.country)
            .style('left', (d3.mouse(this)[0] + 30) + 'px')
            .style('top', (d3.mouse(this)[1] + 30) + 'px');
        };

        const moveTooltip = function (d) {
          tooltip
            .style('left', (d3.mouse(this)[0] + 30) + 'px')
            .style('top', (d3.mouse(this)[1] + 30) + 'px');
        };

        const hideTooltip = (d) => {
          tooltip
            .transition()
            .duration(200)
            .style('opacity', 0);
        };

        // Add dots
        this.svg.append('g')
          .selectAll('dot')
          .data(data)
          .enter()
          .append('circle')
          .attr('class', 'bubbles')
          .attr('cx', (d) => x(d.gdpPercap))
          .attr('cy', (d) => y(d.lifeExp))
          .attr('r', (d) => z(d.pop))
          .style('fill', (d) => myColor(d.continent))
          // -3- Trigger the functions
          .on('mouseover', showTooltip)
          .on('mousemove', moveTooltip)
          .on('mouseleave', hideTooltip);
      }
    );
  }

  ngOnInit(): void {
  }

}
