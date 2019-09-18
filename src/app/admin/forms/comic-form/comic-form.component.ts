import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { GenresService } from 'src/app/services/genres.service';
import { Genre, AuthorRead, Publisher } from 'src/app/types/responses';
import { PublishersService } from 'src/app/services/publishers.service';
import { AuthorsService } from 'src/app/services/authors.service';
import { ComicsService } from 'src/app/services/comics.service';
import { validateRegex } from 'src/app/shared/validators/regex.directive';

export interface ComicSubmitData {
  image: string;
  name: string;
  genres: number[];
  authors: number[];
  issues: number;
  publisher: number;
  description: string;
}

@Component({
  selector: 'app-comic-form',
  templateUrl: './comic-form.component.html',
  styleUrls: ['./comic-form.component.scss']
})
export class ComicFormComponent implements OnInit {
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

    this.comicService.createComic(this.toFormData(data))
      .subscribe(() => {
        this.dialogRef.close();
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
}
