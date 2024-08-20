import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../service/cart.service'; // Adjust the path as necessary

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  removeFromCart(product: CartItem): void {
    this.cartService.removeFromCart(product);
  }
}
