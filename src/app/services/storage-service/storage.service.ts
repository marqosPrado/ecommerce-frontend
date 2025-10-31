import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Utility service for safe localStorage/sessionStorage access in SSR environments
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Get item from localStorage
   */
  getItem(key: string): string | null {
    if (this.isBrowser) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error(`Error getting item '${key}' from localStorage:`, error);
        return null;
      }
    }
    return null;
  }

  /**
   * Set item in localStorage
   */
  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error(`Error setting item '${key}' in localStorage:`, error);
      }
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing item '${key}' from localStorage:`, error);
      }
    }
  }

  /**
   * Clear all items from localStorage
   */
  clear(): void {
    if (this.isBrowser) {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  }

  /**
   * Check if running in browser
   */
  get isAvailable(): boolean {
    return this.isBrowser;
  }

  /**
   * Get item from sessionStorage
   */
  getSessionItem(key: string): string | null {
    if (this.isBrowser) {
      try {
        return sessionStorage.getItem(key);
      } catch (error) {
        console.error(`Error getting item '${key}' from sessionStorage:`, error);
        return null;
      }
    }
    return null;
  }

  /**
   * Set item in sessionStorage
   */
  setSessionItem(key: string, value: string): void {
    if (this.isBrowser) {
      try {
        sessionStorage.setItem(key, value);
      } catch (error) {
        console.error(`Error setting item '${key}' in sessionStorage:`, error);
      }
    }
  }

  /**
   * Remove item from sessionStorage
   */
  removeSessionItem(key: string): void {
    if (this.isBrowser) {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing item '${key}' from sessionStorage:`, error);
      }
    }
  }
}
