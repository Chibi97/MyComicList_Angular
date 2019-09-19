import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { GenresService } from 'src/app/services/genres.service';
import { Genre, AuthorRead, Publisher } from 'src/app/types/responses';
import { PublishersService } from 'src/app/services/publishers.service';
import { AuthorsService } from 'src/app/services/authors.service';
import { ComicsService } from 'src/app/services/comics.service';
import { validateRegex } from 'src/app/shared/validators/regex.directive';
import { isErrorResponse } from 'src/app/types/utils';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

export interface ComicSubmitData {
  image: string;
  name: string;
  genres: number[];
  authors: number[];
  issues: number;
  publisher: number;
  publishedAt: Date;
  description: string;
}

@Component({
  selector: 'app-comic-form',
  templateUrl: './comic-form.component.html',
  styleUrls: ['./comic-form.component.scss']
})
export class ComicFormComponent implements OnInit {
  customError: string;
  maxDate = new Date();
  minDate = new Date(1970, 1, 1);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ComicFormComponent>,
    private genreService: GenresService,
    private publisherService: PublishersService,
    private authorService: AuthorsService,
    private comicService: ComicsService
  ) { }

  comicForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    issues: ['', [Validators.required, validateRegex(/^\d+$/)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(700)]],
    authors: [[], Validators.required],
    genres: [[], Validators.required],
    publisher: ['', Validators.required],
    publishedAt: ['', [Validators.required]],
    image: ['', Validators.required]
  });

  genres: Genre[];
  authors: AuthorRead[];
  publishers: Publisher[];
  btnText = 'Add New Comic';
  imgUrl: string;
  selectedFile: File;

  ngOnInit() {
    this.getData();
  }

  onUploadClick(fileInputRef: HTMLInputElement) {
    fileInputRef.click();
  }

  onSubmit() {
    const data = this.comicForm.value as ComicSubmitData;
    console.log(data);
    this.comicService.createComic(this.toFormData(data))
      .subscribe(() => {
        console.log('Comic created!');
        this.dialogRef.close();
      },
      (err: HttpErrorResponse) => {
        if (isErrorResponse(err.error)) {
          if (err.error.errors.Name) {
            this.comicForm.controls.name.setErrors({ backend: err.error.errors.Name });
          }

          if (err.error.errors.Issues) {
            this.comicForm.controls.issues.setErrors({ backend: err.error.errors.Issues });
          }

          if (err.error.errors.Description) {
            this.comicForm.controls.description.setErrors({ backend: err.error.errors.Description });
          }

          if (err.error.errors.Genres) {
            this.comicForm.controls.genres.setErrors({ backend: err.error.errors.Genres });
          }

          if (err.error.errors.Authors) {
            this.comicForm.controls.authors.setErrors({ backend: err.error.errors.Authors });
          }

          if (err.error.errors.Publisher) {
            this.comicForm.controls.publisher.setErrors({ backend: err.error.errors.Publisher });
          }

          if (err.error.errors.PublishedAt) {
            this.comicForm.controls.publishedAt.setErrors({ backend: err.error.errors.PublishedAt });
          }

          if (err.error.errors.Image) {
            this.comicForm.controls.image.setErrors({ backend: err.error.errors.image });
          }

        } else {
          this.customError = err.error.message;
          if (this.customError.includes('Name')) {
            this.comicForm.controls.name.setErrors({ invalid: true });
          } else {
            this.comicForm.setErrors({ invalid: true });
          }

          if (this.customError.includes('Image')) {
            this.comicForm.controls.image.setErrors({ invalid: true });
          } else {
            this.comicForm.setErrors({ invalid: true });
          }
        }
      });
  }

  preview(files: File[]) {
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();
    this.comicForm.get('image').markAsTouched();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgUrl = reader.result as string;
    };
    this.selectedFile = file;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  toFormData(formData: ComicSubmitData): FormData {
    const fd = new FormData();
    fd.append('publisher', '' + formData.publisher);
    fd.append('name', formData.name);
    fd.append('issues', '' + formData.issues);
    fd.append('description', formData.description);
    fd.append('publishedAt', moment(formData.publishedAt).format('YYYY-MM-DD'));
    formData.authors.forEach((author) => fd.append('authors', '' + author));
    formData.genres.forEach((genre) => fd.append('genres', '' + genre));
    fd.append('image', this.selectedFile);

    return fd;
  }

  getData() {
    this.genreService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });

    this.authorService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });

    this.publisherService.getPublishers().subscribe((publishers) => {
      this.publishers = publishers;
    });
  }

  displayErrors(name: string) {
    if (this.comicForm.get(name).errors) {
      return this.comicForm.get(name).errors.backend;
    }

    return [];
  }
}
