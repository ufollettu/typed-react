import React, { FunctionComponent } from "react";
import Form, { required, minLength, IValues, ISubmitResult } from "./Form";

interface IProps {
  onSubmit: (values: IValues) => Promise<ISubmitResult>
}

const ContactUs: FunctionComponent<IProps> = props => {

  const handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    const result = await props.onSubmit(values);
    return result;
  }

  return (
    <Form
      defaultValues={{ name: "", email: "", reason: "Support", notes: "" }}
      validationRules={{
        email: { validator: required },
        name: [{ validator: required }, { validator: minLength, arg: 2 }]
      }}
      onSubmit={handleSubmit}
    >
      <Form.Field name="name" label="Your Name" />
      <Form.Field name="email" label="Your email" type="Email" />
      <Form.Field
        name="reason"
        label="Your Reason"
        type="Select"
        options={["Marketing", "Support", "Feedback", "Jobs", "Other"]}
      />
      <Form.Field name="notes" label="Your Notes" type="TextArea" />
    </Form>
  );
};

export default ContactUs;
