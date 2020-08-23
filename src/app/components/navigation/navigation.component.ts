import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  title = 'AngularD3';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openLink(link: string): void {
    console.log(link);
    this.router.navigate([`/${link}`]);
  }

}
