import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {StorageService} from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storage = inject(StorageService);
  private itemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public items$: Observable<CartItem[]> = this.itemsSubject.asObservable();

  constructor() {
    const savedCart = this.storage.getItem('shoppingCart');
    if (savedCart) {
      try {
        this.itemsSubject.next(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        this.storage.removeItem('shoppingCart');
      }
    }
  }

  public addToCart(product: Product): void {
    const currentItems: CartItem[] = [...this.itemsSubject.getValue()];

    const itemIndex = currentItems.findIndex((item: CartItem) => item.product.id === product.id);
    if (itemIndex > -1) {
      currentItems[itemIndex] = {
        ...currentItems[itemIndex],
        quantity: currentItems[itemIndex].quantity + 1
      };
    } else {
      currentItems.push({ product: product, quantity: 1 } as CartItem);
    }

    this.itemsSubject.next(currentItems);
    this.saveCart();
  }

  private saveCart(): void {
    this.storage.setItem('shoppingCart', JSON.stringify(this.itemsSubject.getValue()));
  }

  public calculateTotalValue(): Observable<number> {
    return this.items$.pipe(
      map(items => items.reduce(
        (acc, item) => acc + (item.product.price * item.quantity), 0)
      )
    );
  }

  public removeFromCart(productId: number): void {
    const currentItems: CartItem[] = this.itemsSubject.getValue()
      .filter((item: CartItem) => item.product.id !== productId);
    this.itemsSubject.next(currentItems);
    this.saveCart();
  }

  public getProductQuantity$(productId: number): Observable<number> {
    return this.items$.pipe(
      map((items: CartItem[]) => {
        const itemInCart = items.find(item => item.product.id === productId);
        return itemInCart?.quantity ?? 0;
      })
    );
  }

  public updateQuantity(productId: number, quantity: number): void {
    const items = [...this.itemsSubject.getValue()];
    const index = items.findIndex(i => i.product.id === productId);
    if (index > -1) {
      items[index] = {
        ...items[index],
        quantity: quantity
      };
      this.itemsSubject.next(items);
      this.saveCart();
    }
  }

  public clearCart(): void {
    this.itemsSubject.next([]);
    this.saveCart();
  }
}
