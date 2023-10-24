import { CostsService } from './../../shared/services/costs.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Costs } from 'src/app/shared/models/Costs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Sort } from '@angular/material/sort';
import * as CanvasJS from 'canvasjs';

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
  chartOptions: any;
  columnChartOptions: any;
  chart: any;

  constructor(
    private router: Router,
    private costsService: CostsService,
    private authService: AuthService
  ) {
    this.sortedData = this.costs.slice();
    this.chartOptions = this.getChartOptions();
    this.columnChartOptions = this.getColumnChartOptions();
  }

  ngOnInit(): void {
    this.costsService.loadCosts().subscribe((data) => {
      this.costs = data;
      this.sortedData = this.costs.slice();
      this.chartOptions = this.getChartOptions();
      this.columnChartOptions = this.getColumnChartOptions();
    });

    this.authService.isUserLoggedIn().subscribe(
      (user) => {
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
    this.chartOptions.data[0].dataPoints = this.sortedData.map((cost) => ({
      y: cost.price,
      name: cost.category,
    }));
    this.columnChartOptions.data[0].dataPoints = this.sortedData.map(
      (cost) => ({
        label: cost.category,
        y: cost.price,
      })
    );
  }

  private getColumnChartOptions() {
    return {
      animationEnabled: true,
      title: {
        text: 'Column Chart Title',
      },
      data: [
        {
          type: 'column',
          dataPoints: this.sortedData.map((cost) => ({
            label: cost.category,
            y: cost.price,
          })),
        },
      ],
    };
  }

  private getChartOptions() {
    return {
      animationEnabled: true,
      title: {
        text: 'Kiadás diagram',
      },
      data: [
        {
          type: 'pie',
          startAngle: -90,
          indexLabel: '{name}: {y}',
          yValueFormatString: "'HUF'#,###.##",
          dataPoints: this.sortedData.map((cost) => ({
            y: cost.price,
            name: cost.category,
          })),
        },
      ],
    };
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
