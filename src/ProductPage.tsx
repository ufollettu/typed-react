import React, { Component } from "react";
import { Prompt, RouteComponentProps } from "react-router-dom";
import { IProduct, products, getProduct } from "./ProductData";
import Product from "./Product";
import { throws } from "assert";

type Props = RouteComponentProps<{ id: string }>;

interface IState {
  product?: IProduct;
  added: boolean;
  loading: boolean;
}

class ProductPage extends Component<Props, IState> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      added: false,
      loading: true
    };
  }

  /**
   * componentDidMount
   */
  public async componentDidMount() {
    if (this.props.match.params.id) {
      // props.match is an object containing a route params object
      const id: number = parseInt(this.props.match.params.id, 10);
      const product = await getProduct(id);
      if (product !== null) {
        this.setState({ product, loading : false });
      }
    }
  }

  public render() {
    const product = this.state.product;
    return (
      <div className="page-container">
        <Prompt when={!this.state.added} message={this.navAwayMessage} />
        {product || this.state.loading ? (
          // (see Product component)
          // We use React.Fragment in the true part of the ternary
          // because each part of a ternary can only have a single
          // parent and React.Fragment is a mechanism for achieving this,
          // without rendering something like a div tag
          // that is not really needed.
          <Product
            loading={this.state.loading}
            product={product}
            inBasket={this.state.added}
            onAddBasket={this.handleAddClick}
            reviews={[]}
          />
        ) : (
          <p>Product not found!</p>
        )}
      </div>
    );
  }

  private handleAddClick = () => {
    this.setState({ added: true });
  };

  private navAwayMessage = () => "sure to leave?";
}

export default ProductPage;
