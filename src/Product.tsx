import React, { FunctionComponent, Fragment } from "react";
import { IProduct, IReview } from "./ProductData";
import Tabs from "./Tabs";
import withLoader from "./withLoader";

interface IProps {
  product?: IProduct;
  reviews: IReview[];
  inBasket: boolean;
  onAddBasket: () => void;
}
const Product: FunctionComponent<IProps> = props => {
  const { product } = props;
  const handleAddClick = () => {
    props.onAddBasket();
  };
  if (!product) {
      return null;
  }
  return (
    // We use <Fragment> in the true part of the ternary
    // because each part of a ternary can only have a single
    // parent and <Fragment> is a mechanism for achieving this,
    // without rendering something like a div tag
    // that is not really needed.
    <Fragment>
      <h1>{product.name}</h1>
      <Tabs>
        <Tabs.Tab
          name="Description"
          initialActive={true}
          // heading() is a render prop
          heading={() => <b>Description</b>}
        >
          <p>{product.description}</p>
        </Tabs.Tab>
        <Tabs.Tab name="Reviews" heading={() => "Reviews"}>
          <ul className="product-reviews">
            {product.reviews.map(review => (
              <li key={review.reviewer}>
                <i>"{review.comment}"</i> - {review.reviewer}
              </li>
            ))}
          </ul>
        </Tabs.Tab>
      </Tabs>

      <p className="product-price">
        {/* 
            We use Intl.NumberFormat to format 
            the product price as currency with 
            a currency symbol 
        */}
        {new Intl.NumberFormat("it-IT", {
          currency: "EUR",
          style: "currency"
        }).format(product.price)}
      </p>
      {!props.inBasket && (
        <button onClick={handleAddClick}>Add to basket</button>
      )}
    </Fragment>
  );
};

// use of a HOC to wrap a component
export default withLoader(Product);
