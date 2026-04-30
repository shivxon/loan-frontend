import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => {
    // In browser, use relative path to leverage the proxy (proxy.conf.json)
    if (typeof window !== 'undefined') {
      return '/api';
    }
    // Fallback for SSR (backend on port 3000)
    return 'http://localhost:3000/api';
  },
});
