import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service'; 
import { ProductService, Product } from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  isAdded(product: Product): boolean {
    return !!this.cartService
      .getCartItems()
      .find((item) => item.name === product.name);
  }

  getQuantity(product: Product): number {
    const cartItem = this.cartService
      .getCartItems()
      .find((item) => item.name === product.name);
    return cartItem ? cartItem.quantity : 1;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  increment(product: Product): void {
    const cartItem = this.cartService
      .getCartItems()
      .find((item) => item.name === product.name);
    if (cartItem) {
      this.cartService.addToCart(cartItem);
    }
  }

  decrement(product: Product): void {
    const cartItem = this.cartService
      .getCartItems()
      .find((item) => item.name === product.name);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      this.cartService.removeFromCart(product);
    }
  }
}
