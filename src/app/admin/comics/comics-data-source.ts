import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Comic } from 'src/app/types/responses';
import { Observable, BehaviorSubject } from 'rxjs';
import { ComicsService } from 'src/app/services/comics.service';
import { finalize } from 'rxjs/operators';

export class ComicsDataSource implements DataSource<Comic> {
    private comicsSubject = new BehaviorSubject<Comic[]>([]);
    private lengthSubject = new BehaviorSubject<number>(0);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public length$ = this.lengthSubject.asObservable();

    constructor(
        private comicService: ComicsService
    ) {}

    connect(collectionViewer: CollectionViewer): Observable<Comic[]> {
        return this.comicsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.comicsSubject.complete();
        this.loadingSubject.complete();
    }

    loadComics(page = 1, pageSize = 5) {
        this.loadingSubject.next(true);

        this.comicService.getComics(page, pageSize)
            .pipe(finalize(() => {
                this.loadingSubject.next(false);
            }))
            .subscribe(comics => {
                this.lengthSubject.next(comics.totalCount);
                this.comicsSubject.next(comics.data);
            });
    }
}
