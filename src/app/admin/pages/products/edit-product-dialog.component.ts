import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from './product.service';
import { CategoryService, ICategory } from './category.service';
import { ImageService } from '../../../core/Services/image.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  form: FormGroup;
  imageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  currentImage: string | null = null;
  categories: ICategory[] = [];
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {
    this.isEditMode = !!data.id;
    
    this.form = this.fb.group({
      name: [data.name, [Validators.required]],
      newPrice: [data.newPrice || '', [Validators.required, Validators.min(0)]],
      oldPrice: [data.oldPrice || '', [Validators.required, Validators.min(0)]],
      categoryId: [null, [Validators.required]],
      description: [data.description, [Validators.required]]
    });
  }

  ngOnInit() {
    // Load categories
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      
      // If editing, find and set the current category
      if (this.data.id && this.data.categoryName) {
        const category = this.categories.find(c => c.name === this.data.categoryName);
        if (category) {
          this.form.patchValue({ categoryId: category.id });
        }
      }
    });

    // Show current image if exists
    if (this.data.photos && this.data.photos.length > 0) {
      const imagePath = this.data.photos[0].imageName;
      console.log('Image Path:', imagePath); // للتأكد من المسار
      this.currentImage = this.imageService.getFullImageUrl(imagePath);
      console.log('Full Image URL:', this.currentImage); // للتأكد من المسار الكامل
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // التحقق من حجم الملف (5MB كحد أقصى)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size should not exceed 5MB');
        return;
      }

      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSave() {
    if (this.form.valid) {
      const formData = new FormData();
      
      if (this.isEditMode) {
        formData.append('Id', this.data.id.toString());
      }
      
      formData.append('Name', this.form.value.name);
      formData.append('NewPrice', this.form.value.newPrice.toString());
      formData.append('OldPrice', this.form.value.oldPrice.toString());
      formData.append('CategoryId', this.form.value.categoryId.toString());
      formData.append('Description', this.form.value.description);
      
      if (this.imageFile) {
        formData.append('Image', this.imageFile);
      }
      
      this.dialogRef.close(formData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  removeImage() {
    this.imageFile = null;
    this.imagePreview = null;
    this.currentImage = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
} 