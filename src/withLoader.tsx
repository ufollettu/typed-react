// HOC  (High-order component)
// used to wrap a Component to extend his properties
import React, { ComponentType, FunctionComponent, SFC } from "react";

interface IProps {
  loading: boolean;
}

// Function Based HOC
const withLoader = <P extends object>(
  Component: ComponentType<P>
): FunctionComponent<P & IProps> => ({ loading, ...props }: IProps) => {
  return loading ? (
    <div className="loader-overlay">
      <div className="loader-circle-wrap">
        <div className="loader-circle" />
      </div>
    </div>
  ) : (
    <Component {...props as P} />
  );
};

// Class Based HOC
// const withLoader = <P extends object>(Component: React.ComponentType<P>) =>
//   class WithLoader extends React.Component<P & IProps> {
//     public render() {
//       const { loading, ...props } = this.props as IProps;
//       return loading ? (
//         <div className="loader-overlay">
//           <div className="loader-circle-wrap">
//             <div className="loader-circle" />
//           </div>
//         </div>
//       ) : (
//         <Component {...props as P} />
//       );
//     }
//   };

export default withLoader;
