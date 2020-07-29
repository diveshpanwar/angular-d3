import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { thresholdFreedmanDiaconis } from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openLink(link: string): void {
    this.router.navigate([`/${link}`]);
  }

}
