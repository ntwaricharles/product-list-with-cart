import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product): void {
    const existingProduct = this.cartItems.find(
      (item) => item.name === product.name
    );
    if (existingProduct) {
      // Update quantity if the product is already in the cart
      existingProduct.quantity += 1;
    } else {
      // Add new product to cart with initial quantity of 1
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.name !== product.name
    );
    this.cartSubject.next(this.cartItems);
  }

  clearCart(): void {
    // Clear all items from the cart
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
