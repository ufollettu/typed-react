import React, { Component } from "react";
import './Confirm.css';

interface IProps {
    open: boolean,
    title: string,
    content: string,
    cancelCaption?: string,
    okCaption?: string,
    onOkClick: () => void,
    onCancelClick: () => void,
}

class Confirm extends Component<IProps> {
    // defaultProps is a fallback for the parent props
    // if these props does not exists
    public static defaultProps = {
        cancelCaption: 'Cancel',
        okCaption: 'OK'
    }

    public render() {
    return (
      <div className={this.props.open
            ? "confirm-wrapper confirm-visible"
            : "confirm-wrapper"
            }
        >
        <div className="confirm-container">
          <div className="confirm-title-container">
            <span>{this.props.title ? this.props.title : "no title"}</span>
          </div>
          <div className="confirm-content-container">
            <p>{this.props.content ? this.props.content : "no content"}</p>
          </div>
          <div className="confirm-buttons-container">
            <button 
                className="confirm-cancel"
                onClick={this.handleCancelClick}>
            {this.props.cancelCaption}
            </button>
            <button 
                className="confirm-ok"
                onClick={this.handleOkClick}>
            {this.props.okCaption}            
            </button>
          </div>
        </div>
      </div>
    );
  }
  private handleOkClick = () => {
   this.props.onOkClick();
  }
  private handleCancelClick = () => {
   this.props.onCancelClick();
  }
}

export default Confirm;
