import React, { Component } from "react";
import ContactUs from "./ContactUs";
import { IValues, ISubmitResult } from "./Form";

interface IState {
  name: string;
  email: string;
  reason: string;
  notes: string;
}

class ContactPage extends Component<{}, {}> {
  public render() {
    return (
      <div className="page-container">
        <h1>Contact Us</h1>
        <p>Enter your details</p>
        <ContactUs onSubmit={this.handleSubmit}/>
      </div>
    );
  }

  private handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    const wait = (ms: number): Promise<void> => {
      return new Promise(resolve => setTimeout(resolve, ms));
    } 
    // simulate API async call
    await wait(1000);
    return {
      errors: {
        name: ['some is wrong with this']
      },
      success: true
    }
  }
}

export default ContactPage;
