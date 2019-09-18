import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GenresService } from 'src/app/services/genres.service';
import { Genre, AuthorRead, Publisher } from 'src/app/types/responses';
import { PublishersService } from 'src/app/services/publishers.service';
import { AuthorsService } from 'src/app/services/authors.service';

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
    private authorService: AuthorsService
  ) { }

  comicForm = this.fb.group({
    name: ['', Validators.required],
    issues: ['', Validators.required],
    description: ['', Validators.required],
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

  ngOnInit() {
    this.getData();
  }

  onUploadClick(fileInputRef: HTMLInputElement) {
    fileInputRef.click();
  }

  preview(files: File[]) {
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgUrl = reader.result as string;
    };
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
