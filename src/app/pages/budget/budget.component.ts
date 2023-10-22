import { CostsService } from './../../shared/services/costs.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Costs } from 'src/app/shared/models/Costs';
import { AuthService } from 'src/app/shared/services/auth.service';
import {Sort, MatSortModule} from '@angular/material/sort';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {

  costId: any; 
  costs: Array<Costs> = [];
  loggedInUser?: firebase.default.User | null;
  sortedData: Costs[];

  constructor(private router: Router,
    private costsService: CostsService,
    private authService: AuthService,
  ) { this.sortedData = this.costs.slice(); }

  ngOnInit(): void {
    this.costsService.loadCosts().subscribe(data => {
      this.costs = data;
      this.sortedData = this.costs.slice();
    });

    this.authService.isUserLoggedIn().subscribe(
      user => {
        this.loggedInUser = user;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.costs.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'category':
          return compare(a.category, b.category, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
