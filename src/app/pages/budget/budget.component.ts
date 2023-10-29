import { BudgetAddComponent } from './../budget-add/budget-add.component';
import { CostsService } from './../../shared/services/costs.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Costs } from 'src/app/shared/models/Costs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

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
  sortedTable: Costs[];
  chartOptions: any;
  columnChartOptions: any;
  chart: any;

  constructor(
    private costsService: CostsService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.sortedTable = this.costs.slice();
    this.sortedData = this.getUniqueCategories(this.costs);
  }

  ngOnInit(): void {
    this.costsService.loadCosts().subscribe((data) => {
      this.costs = data;
      this.sortedTable = this.costs.slice();
      this.sortedData = this.getUniqueCategories(data);
      this.chartOptions = this.getChartOptions('#198754', this.sortedData);
      this.columnChartOptions = this.getColumnChartOptions('#198754', this.sortedData);
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
  

  ngAfterViewInit() {
    setTimeout(() => {
      this.chartOptions = this.getChartOptions('#198754', this.sortedData);
      this.columnChartOptions = this.getColumnChartOptions('#198754', this.sortedData);
    });
  }

  openBudgetAddDialog() {
    const dialogRef = this.dialog.open(BudgetAddComponent, {
      width: '500px',
      data: { }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.costs.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedTable = data;
      return;
    }

    this.sortedTable = data.sort((a, b) => {
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

  getUniqueCategories(data: Costs[]): Costs[] {
    const uniqueCategoriesMap = new Map<string, Costs>();
  
    data.forEach((cost) => {
      if (uniqueCategoriesMap.has(cost.category)) {
        const existingCost = uniqueCategoriesMap.get(cost.category);
        if (existingCost) {
          existingCost.price += cost.price;
        }
      } else {
        uniqueCategoriesMap.set(cost.category, { category: cost.category, price: cost.price, user_id: '', id: '' });
      }
    });
  
    const uniqueCategories: Costs[] = Array.from(uniqueCategoriesMap.values());
  
    return uniqueCategories;
  }
  
  private getColumnChartOptions(titleColor: string, data: Costs[]) {
    return {
      animationEnabled: true,
      title: {
        text: 'Kiadás oszlopdiagram',
        fontColor: titleColor,
      },
      data: [
        {
          type: 'column',
          yValueFormatString: "'HUF'#,###.##",
          dataPoints: data.map((cost) => ({
            label: cost.category,
            y: cost.price,
          })),
        },
      ],
    };
  }
  
  private getChartOptions(titleColor: string, data: Costs[]) {
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
          dataPoints: data.map((cost) => ({
            y: cost.price,
            name: cost.category,
          })),
        },
      ],
    };
  }

  delete(cost: Costs) {
    this.costsService.delete(cost.id)
      .then(() => {
        // After the deletion is successful, update your costs array.
        this.costs = this.costs.filter(c => c.id !== cost.id);
        
        // Recalculate the unique categories based on the updated costs.
        this.sortedData = this.getUniqueCategories(this.costs);
    
        // Update the chart options based on the sorted data.
        this.chartOptions = this.getChartOptions('#198754', this.sortedData);
        this.columnChartOptions = this.getColumnChartOptions('#198754', this.sortedData);
        
      })
      .catch(error => {
        console.error('Error deleting item: ', error);
      });
  }
  
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}