import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = environment.baseURL;

  getFullImageUrl(relativePath: string | null): string {
    if (!relativePath) {
      return 'assets/images/placeholder.png';
    }

    // إذا كان المسار يبدأ بـ http أو https، نعيده كما هو
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }

    // تأكد من أن المسار يبدأ بـ /
    const normalizedPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
    
    // تجميع المسار الكامل
    return `${this.baseUrl}${normalizedPath}`;
  }
} 