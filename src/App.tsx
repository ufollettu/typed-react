import React, { Component } from "react";
import "./App.css";
import Confirm from "./Confirm";
import ConfirmSFC from "./ConfirmSFC";
import { strict } from "assert";

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
}

class App extends Component<{}, IState> {
  private timer: number = 0;
  private renderCount = 0;

  constructor(props: {}) {
    super(props);
    this.state = {
      confirmOpen: false,
      confirmMessage: "please hit the confirm button",
      confirmVisible: true,
      countDown: 10
    };
  }

  public static getDerivedStateFromProps(props: {}, state: IState) {
    // console.log("getDerivedStateFromProps", props, state);
    return null;
  }

  public shouldComponentUpdate(nextProps: {}, nextState: IState) {
    // console.log("shouldComponentUpdate", nextProps, nextState);
    return true;
    // if returning false the component did not update,
    // getSnapshotBeforeUpdate and componentDidUpdate 
    // are not invoked
  }

  public getSnapshotBeforeUpdate(prevProps: {}, prevState: IState) {
    this.renderCount += 1;
    // console.log("getSnapshotBeforeUpdate", prevProps, prevState, {
    //   renderCount: this.renderCount
    // });
    return this.renderCount;
  }

  public componentDidUpdate(
    prevProps: {},
    prevState: IState,
    snapshot: number
  ) {
    // console.log("componentDidUpdate", prevProps, prevState, snapshot, {
    //   renderCount: this.renderCount
    // });
  }

  public componentDidMount() {
    // Useful to:
    // - Call a web service to get some data
    // - Add event listeners
    // - Initialize timers
    this.timer = window.setInterval(() => this.handleTimerTick(), 1000);
    // - Initialize third-party libraries
  }

  public componentWillUnmount() {
    // Useful to:
    // Removing event listeners
    // Canceling active network requests
    // Removing timers
    clearInterval(this.timer);
  }
  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.confirmMessage}</p>
          {this.state.confirmVisible && (
            <button onClick={this.handleConfirmClick}>Confirm</button>
          )}
        </header>
        <Confirm
          open={this.state.confirmOpen}
          title="this is a title from the app"
          content="this is the content form the app"
          cancelCaption="CancelApp"
          okCaption="OKApp"
          onCancelClick={this.handleCancelConfirmClick}
          onOkClick={this.handleOkConfirmClick}
        />
      </div>
    );
  }

  private handleCancelConfirmClick = () => {
    this.setState({
      confirmMessage: "NO man",
      confirmOpen: false
    });
    clearInterval(this.timer);
  };

  private handleOkConfirmClick = () => {
    this.setState({
      confirmMessage: "OOOOK",
      confirmOpen: false
    });
    clearInterval(this.timer);
  };

  private handleConfirmClick = () => {
    this.setState({ confirmOpen: true });
    clearInterval(this.timer);
  };

  private handleTimerTick = () => {
    this.setState(
      {
        confirmMessage: `
        Please hit the confirm button: 
        ${this.state.countDown} secs to go`,
        countDown: this.state.countDown - 1
      },
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer);
          this.setState({
            confirmMessage: "too late",
            confirmVisible: false
          });
        }
      }
    );
  };
}

export default App;
