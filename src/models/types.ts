export interface IProduct {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
  description: string;
}

export interface IReview {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface IReviewAdd {
  id: string;
  product: number;
  name: string;
  date: string;
  description: string;
  rating: number;
}