import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  viewModal = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  confirmOrder(): void {
    this.viewModal = true;
  }

  closeModal(): void {
    this.viewModal = false;
    this.cartService.clearCart();
  }
}
