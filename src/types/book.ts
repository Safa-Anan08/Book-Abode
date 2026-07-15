export interface BookFormData {
  title: string;
  author: string;
  category: string;

  image?: File | string;
  pdf?: File;

  price: number;
  rating: number;

  shortDescription: string;
  fullDescription: string;
}