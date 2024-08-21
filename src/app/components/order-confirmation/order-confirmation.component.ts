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

  isModalVisible: boolean = false;
  modalClass: string = 'translate-y-full'; 

  ngOnInit(): void {
    this.showModal();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  shop(): void {
    this.hideModal();
  }

  showModal(): void {
    this.isModalVisible = true;
    setTimeout(() => {
      this.modalClass = 'translate-y-0';
    }, 10);
  }

  hideModal(): void {
    this.modalClass = 'translate-y-full';
    setTimeout(() => {
      this.isModalVisible = false;
      this.complete.emit();
    }, 500); 
  }
}
