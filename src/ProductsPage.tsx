import React, { Component } from "react";
import { IProduct, products } from "./ProductData";
import { Link, RouteComponentProps } from "react-router-dom";
import "url-search-params-polyfill";

interface IState {
  products: IProduct[];
  search: string;
}

class ProductsPage extends Component<RouteComponentProps, IState> {
  public constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      products: [],
      search: ""
    };
  }

  // set the query param 'search' and parse it as a string
  // to pass the value to componentDidMount
  // to use URLSearchParams we need a polyfill:
  // npm install url-search-params-polyfill and
  // import "url-search-params-polyfill";
  public static getDerivedStateFromProps(
    props: RouteComponentProps,
    state: IState
  ) {
    const searchParams = new URLSearchParams(props.location.search);
    const search = searchParams.get("search") || "";
    return {
      products: state.products,
      search
    };
  }

  public componentDidMount() {
    this.setState({
      products
    });
  }

  public render() {
    return (
      <div className="page-container">
        <p>Welcome</p>
        <ul className="product-list">
          {this.state.products.map(product => {
            if (
              !this.state.search ||
              (this.state.search &&
                product.name
                  .toLowerCase()
                  .indexOf(this.state.search.toLowerCase()) > -1)
            ) {
              return (
                <li key={product.id} className="product-list-item">
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    );
  }
}

export default ProductsPage;
