export interface Publisher {
  id: number;
  name: string;
  origin: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface PageResponse<T> {
  currentPage: number;
  pageCount: number;
  perPage: number;
  totalCount: number;
  data: T[];
}

export interface Comic {
  id: number;
  name: string;
  description: string;
  issues: number;
  publishedAt: Date;
  publisher: string;
  genres: string[];
  authors: string[];
  pictures: string[];
  image: string;
}
