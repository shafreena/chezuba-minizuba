import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderLineTableComponent } from './components/order-line-table/order-line-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderLineTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'minizuba';
}
