import { inherits } from "util";

export interface OrderType {
  [key: string]: string | number;
  OrderLineID: number,
  OrderID: number,
  StockItemID: number,
  Description: string,
  PackageTypeID: number,
  Quantity: number,
  UnitPrice: number

}
export interface GroupOrderType {
  [key: string]: string | number | boolean;
  groupName: string,
  isGroup: boolean,
  value: number
}
export interface DynamicInterface {
  [key: string]: string | number | boolean;
};