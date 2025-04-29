import { Component, OnInit } from '@angular/core';
import { OrderService, IOrder } from './order.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'buyerEmail', 'total', 'orderDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<IOrder>([]);
  loading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.dataSource.data = orders;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  viewDetails(order: IOrder) {
    // سيتم تنفيذ عرض التفاصيل لاحقًا
    alert('Order details for ID: ' + order.id);
  }

  deleteOrder(id: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.fetchOrders();
      });
    }
  }

  openEditDialog(order: IOrder) {
    alert('Edit order: ' + order.id);
  }
}
