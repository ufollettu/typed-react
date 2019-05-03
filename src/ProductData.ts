import { async } from "q";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  reviews: IReview[];
}

export interface IReview {
  comment: string;
  reviewer: string;
}

export const products: IProduct[] = [
  {
    description:
      "A collection of navigational components that compose declaratively with your app",
    id: 1,
    name: "React Router",
    price: 8,
    reviews: [
      { comment: "Excellent! This does everything I want", reviewer: "Billy" },
      { comment: "The best router I've ever worked with", reviewer: "Sally" }
    ]
  },
  {
    description: "A library that helps manage state across yourapp",
    id: 2,
    name: "React Redux",
    price: 12,
    reviews: [
      { comment: "Excellent! This does everything I want", reviewer: "Billy" },
      { comment: "I've found this really useful in a large app I'm working on", reviewer: "Sally" },
      { comment: "A bit confusing at first but simple when you get used to it", reviewer: "Jhonny" }
    ]
  },
  {
    description: "A library that helps you interact with aGraphQL backend",
    id: 3,
    name: "React Apollo",
    price: 12,
    reviews: [
      { comment: "It makes working with GraphQL backends a breeze", reviewer: "Billy" },
    ]
  }
];

export const getProduct = async (id: number) : Promise<IProduct | null> => {
  await wait(1000);
  const foundProducts = products.filter(customer => customer.id === id);
  return foundProducts.length === 0 ? null: foundProducts[0];
}

const wait = (ms:number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}