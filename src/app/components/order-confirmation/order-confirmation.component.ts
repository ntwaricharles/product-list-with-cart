import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../service/cart.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
})
export class OrderConfirmationComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() total: number = 0;
  @Output() complete = new EventEmitter<void>();

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  shop(): void {
    // Emit the event to close the modal and start a new order
    this.complete.emit();
  }
}
