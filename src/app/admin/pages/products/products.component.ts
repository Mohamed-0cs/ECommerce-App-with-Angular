import { Component, OnInit } from '@angular/core';
import { ProductService, IProduct } from './product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from './edit-product-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { ImageService } from '../../../core/Services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'name', 'oldPrice', 'newPrice', 'categoryName', 'rating', 'description', 'actions'];
  dataSource = new MatTableDataSource<IProduct>([]);
  loading = false;
  
  // Pagination
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 25, 50];

  constructor(
    private productService: ProductService, 
    private dialog: MatDialog,
    private imageService: ImageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.productService.getAllProducts(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.totalItems = response.totalCount;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.showError('Failed to load products');
        console.error('Error loading products:', error);
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchProducts();
  }

  getMainPhotoUrl(product: IProduct): string {
    if (product.photos && product.photos.length > 0) {
      return this.imageService.getFullImageUrl(product.photos[0].imageName);
    }
    return this.imageService.getFullImageUrl(null);
  }

  handleImageError(event: any) {
    event.target.src = 'assets/images/placeholder.png';
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.loading = true;
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.showSuccess('Product deleted successfully');
          this.fetchProducts();
        },
        error: (error) => {
          this.loading = false;
          this.showError('Failed to delete product');
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  openAddDialog() {
    const emptyProduct: IProduct = {
      id: 0,
      name: '',
      oldPrice: 0,
      newPrice: 0,
      categoryName: '',
      description: '',
      photos: [],
      rating: 0
    };
    
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '600px',
      data: emptyProduct
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.productService.addProduct(result).subscribe({
          next: () => {
            this.showSuccess('Product added successfully');
            this.fetchProducts();
          },
          error: (error) => {
            this.loading = false;
            this.showError('Failed to add product');
            console.error('Error adding product:', error);
          }
        });
      }
    });
  }

  openEditDialog(product: IProduct) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '600px',
      data: { ...product }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        if (result instanceof FormData) {
          result.append('id', product.id.toString());
        }
        this.productService.updateProduct(result).subscribe({
          next: () => {
            this.showSuccess('Product updated successfully');
            this.fetchProducts();
          },
          error: (error) => {
            this.loading = false;
            this.showError('Failed to update product');
            console.error('Error updating product:', error);
          }
        });
      }
    });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: IProduct, filter: string) => {
      return data.name.toLowerCase().includes(filter) || 
             data.categoryName.toLowerCase().includes(filter) ||
             data.description.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }
}
