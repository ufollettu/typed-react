import React, { FunctionComponent } from "react";
import "./Confirm.css";

interface IProps {
  open: boolean;
  title: string;
  content: string;
  cancelCaption?: string;
  okCaption?: string;
  onOkClick: () => void;
  onCancelClick: () => void;
}

const ConfirmSFC: FunctionComponent<IProps> = props => {
  console.log("confirm rendered");

  // React.useState(0) return an array with current state and setState function
  // [state, setState] = React.useState(0)
  const [cancelClickCount, setCancelClickCount] = React.useState(0);

  // React.useEffect is used to hook into component life cycle,
  // first param is the function to be execuded,
  // second param is an array of value that, if changed,
  // cause the previous function to be executed
  React.useEffect(() => {
    // console.log("open changed");
    // return a fn when component is unmounted
    return () => {
      // console.log("Confirm Unmounted");
    };
  }, [props.open]);

  const handleOkClick = () => {
    props.onOkClick();
  };
  const handleCancelClick = () => {
    const newCount = cancelClickCount + 1;
    setCancelClickCount(newCount);
    if (newCount >= 2) {
      props.onCancelClick();
    }
  };

  return (
    <div
      className={
        props.open ? "confirm-wrapper confirm-visible" : "confirm-wrapper"
      }
    >
      <div className="confirm-container">
        <div className="confirm-title-container">
          <span>{props.title ? props.title : "no title"}</span>
        </div>
        <div className="confirm-content-container">
          <p>{props.content ? props.content : "no content"}</p>
        </div>
        <div className="confirm-buttons-container">
          <button className="confirm-cancel" onClick={handleCancelClick}>
            {cancelClickCount === 0 ? props.cancelCaption : "really?"}
          </button>
          <button className="confirm-ok" onClick={handleOkClick}>
            {props.okCaption}
          </button>
        </div>
      </div>
    </div>
  );
};

// defaultProps is a fallback for the parent props
// if these props does not exists
ConfirmSFC.defaultProps = {
  cancelCaption: "Cancel",
  okCaption: "OK"
};

// wrap functional component in React.memo
// to improve performance:
// component will render only when props changed
// WARNING use memo with care!!!
const confirmMemo = React.memo(ConfirmSFC);
export default confirmMemo;
// export default ConfirmSFC;
