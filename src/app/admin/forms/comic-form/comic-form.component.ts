import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import {Component, OnInit, Inject, AfterViewInit} from '@angular/core';
import { GenresService } from 'src/app/services/genres.service';
import { Genre, AuthorRead, Publisher, Comic } from 'src/app/types/responses';
import { PublishersService } from 'src/app/services/publishers.service';
import { AuthorsService } from 'src/app/services/authors.service';
import { ComicsService } from 'src/app/services/comics.service';
import { validateRegex } from 'src/app/shared/validators/regex.directive';
import { forkJoin } from 'rxjs';

export interface WithId {
  id: number;
}

interface Dict { [id: string]: number; }

export interface ComicSubmitData {
  id?: number;
  selectedFile?: File;
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
    private comicService: ComicsService,
    @Inject(MAT_DIALOG_DATA) comic: Comic
  ) {
    this.editComic = comic;
  }

  comicForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    issues: ['', [Validators.required, validateRegex(/^\d+$/)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(700)]],
    authors: [[], Validators.required],
    genres: [[], Validators.required],
    publisher: ['', Validators.required],
    image: ['', Validators.required]
  });

  editComic: Comic;
  genres: Genre[];
  authors: AuthorRead[];
  publishers: Publisher[];
  btnText = 'Add New Comic';
  imgUrl: string;
  selectedFile: File;

  ngOnInit() {
    if (this.editComic) {
      this.comicForm.get('image').setValidators([]);
      forkJoin(
        this.genreService.getGenres(),
        this.authorService.getAuthors(),
        this.publisherService.getPublishers()
      )
        .subscribe((results) => {
          this.genres = results[0];
          this.authors = results[1];
          this.publishers = results[2];

          const genresDict = this.toValId(this.genres, 'name');
          const authorsDict = this.toValId(this.authors, 'fullName');
          const publisherDict = this.toValId(this.publishers, 'name');

          this.comicForm.patchValue({
            name: this.editComic.name,
            issues: this.editComic.issues,
            description: this.editComic.description,
            authors: this.editComic.authors.map(a => authorsDict[a]),
            genres: this.editComic.genres.map(g => genresDict[g]),
            publisher: publisherDict[this.editComic.publisher]
          });

          this.imgUrl = this.editComic.image;
          this.btnText = 'Edit Comic';
        });

    } else {
      this.getData();
    }
  }

  getFormValidationErrors() {
    const errs = [];
    Object.keys(this.comicForm.controls).forEach(key => {
      const errors = this.comicForm.get(key).errors;
      errs.push({key, errors});
    });

    return errs;
  }

  onUploadClick(fileInputRef: HTMLInputElement) {
    fileInputRef.click();
  }

  onSubmit() {
    const data = this.comicForm.value as ComicSubmitData;

    if (this.editComic) {
      data.selectedFile = this.selectedFile;
      data.id = this.editComic.id;
      this.comicService.editComic(data)
        .subscribe(() => {
          this.dialogRef.close();
        });
    } else {
      data.selectedFile = this.selectedFile;
      this.comicService.createComic(data)
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }

  toValId<T extends WithId, K extends keyof Omit<T, 'id'>>(withId: T[], key: K) {
    const initial: Dict = {};
    return withId.reduce((prev: Dict, curr: T) => {
      const v = curr[key].toString();
      prev[v] = curr.id;
      return prev;
    }, initial);
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
