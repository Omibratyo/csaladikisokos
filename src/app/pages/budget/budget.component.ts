import { BudgetAddComponent } from './../budget-add/budget-add.component';
import { CostsService } from './../../shared/services/costs.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Costs } from 'src/app/shared/models/Costs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
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
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.sortedData = this.costs.slice();
    this.chartOptions = this.getChartOptions('#198754');
    this.columnChartOptions = this.getColumnChartOptions('#198754');
  }

  ngOnInit(): void {
    this.costsService.loadCosts().subscribe((data) => {
      this.costs = data;
      this.sortedData = this.costs.slice();
      this.chartOptions = this.getChartOptions('#198754');
      this.columnChartOptions = this.getColumnChartOptions('#198754');
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

  openBudgetAddDialog() {
    const dialogRef = this.dialog.open(BudgetAddComponent, {
      width: '500px', // Specify the desired width
      data: { /* Pass any data you want to the dialog */ }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result from the dialog (if needed)
      }
    });
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

  private getColumnChartOptions(titleColor: string) {
    return {
      animationEnabled: true,
      title: {
        text: 'Kiadás oszlopdiagram',
        fontColor: titleColor,
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

  private getChartOptions(titleColor: string) {
    return {
      animationEnabled: true,
      title: {
        text: 'Kiadás kördiagram',
        fontColor: titleColor,
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

  delete(cost: Costs) {
    this.costsService.delete(cost.id).then(() => {
      this.costs = this.costs.filter(c => c.id !== cost.id);
      this.sortedData = this.costs.slice();
      this.chartOptions = this.getChartOptions('#198754');
      this.columnChartOptions = this.getColumnChartOptions('#198754');

    }).catch(error => {
      console.error('Error deleting item: ', error);
    });
  }
  
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}