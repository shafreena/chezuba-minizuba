import { Component, OnInit, signal } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Observable, forkJoin } from 'rxjs';
import { DynamicInterface, GroupOrderType, OrderType } from '../../interfaces/order.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as _ from 'lodash';

@Component({
  selector: 'app-order-line-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule, FormsModule, MatButtonToggleModule, MatProgressSpinnerModule],
  templateUrl: './order-line-table.component.html',
  styleUrl: './order-line-table.component.scss'
})
export class OrderLineTableComponent implements OnInit {


  constructor(private orderService: OrdersService) {

  }
  quantity: number | null = null;
  package: number = 1;
  groupingColumn: string = '';
  orderData: OrderType[] = [];
  dataSource: DynamicInterface[] = [];
  isLoadingResults = false
  columns = ['OrderLineID',
    'OrderID',
    'StockItemID',
    'Description',
    'PackageTypeID',
    'Quantity',
    'UnitPrice'];
  lightColorHexCodes: string[] = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '	#ffd9d9', '#fff2cc', '#ead1dc', '#fce5cd', '#d9d2e9', '#efd1fd', '#c0a3ac', '#f6c7d8', '#efe8ea'];
  ngOnInit() {
    window.alert('Cannot load all package types at a time due to memory issues. Please filter the required data');
    this.getOrderLineData();

  }
  getOrderLineData() {
    this.isLoadingResults = true;


    this.orderService.getOrderLines(this.package).subscribe(
      {
        next: (data) => {
          this.orderData = data;
          this.orderData.sort((a: OrderType, b: OrderType) => a.OrderLineID - b.OrderLineID);
          this.dataSource = this.orderData;
          if (this.quantity) {
            this.onFilterByQuantity();
          }
        },
        error: (error) => {
          this.orderData = [];
          window.alert(error.status + ' : ' + error.message);
          this.isLoadingResults = false;
        },
        complete: () => {

          this.isLoadingResults = false;
        }

      }
    );


  }
  startCase(str: string) {
    return _.startCase(str);
  }
  onFilterByQuantity() {


    this.dataSource = this.orderData.filter(order => order.Quantity === this.quantity);


  }
  onFilterByPackage() {

    this.getOrderLineData();

  }
  onShowAll() {
    this.quantity = null;
    this.dataSource = this.orderData;

  }
  onToggleChange(event: string) {
    this.dataSource = [];
    this.groupingColumn = event;


    this.buildDataSource();

  }

  buildDataSource() {
    this.dataSource = this.groupBy(this.groupingColumn, this.orderData);
  }

  groupBy(column: string, data: OrderType[]) {
    if (!column) return data;
    const customReducer = (accumulator: { [x: string]: DynamicInterface[]; }, currentValue: OrderType) => {
      let currentGroup = currentValue[column];
      if (!accumulator[currentGroup])
        accumulator[currentGroup] = [{
          groupName: `${column} ${currentValue[column]}`,
          value: currentValue[column],
          isGroup: true,
        }];

      accumulator[currentGroup].push(currentValue);

      return accumulator;
    }
    let groups = data.reduce(customReducer, {});
    let groupArray = Object.keys(groups).map(key => groups[key]);
    let flatList = groupArray.reduce((a, c) => { return a.concat(c); }, []);
    return flatList.filter((rawLine: DynamicInterface) => {
      return rawLine['isGroup'] || [];
    });
  }
  isGroup(index: number, item: GroupOrderType): boolean {
    return item.isGroup;
  }

}
