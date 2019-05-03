import React, { Component, FunctionComponent } from "react";
import { string } from "prop-types";
import { async } from "q";

// i valori dei form fields
export interface IValues {
  [key: string]: any;
}

export type Validator = (
  fieldName: string,
  values: IValues,
  args?: any
) => string;

export const required: Validator = (
  fieldName: string,
  values: IValues,
  args?: any
): string =>
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === ""
    ? "this must be populated"
    : "";

export const minLength: Validator = (
  fieldName: string,
  values: IValues,
  length: number
): string =>
  values[fieldName] && values[fieldName].length < length
    ? `this must be at least ${length} char`
    : "";

interface IValidation {
  validator: Validator;
  arg?: any;
}

interface IValidationProp {
  [key: string]: IValidation | IValidation[];
}

export interface ISubmitResult {
  success: boolean;
  errors?: IErrors; 
}

interface IFormProps {
  defaultValues: IValues;
  validationRules: IValidationProp;
  onSubmit: (values: IValues) => Promise<ISubmitResult>;
}

interface IFieldProps {
  name: string;
  label: string;
  type?: "Text" | "Email" | "Select" | "TextArea";
  options?: string[];
}

interface IErrors {
  [key: string]: string[];
}

interface IState {
  values: IValues;
  errors: IErrors;
  submitting: boolean;
  submitted: boolean;
}

interface IFormContext {
  errors: IErrors;
  values: IValues;
  setValue?: (fieldName: string, value: any) => void;
  validate?: (fieldName: string, value: any) => void;
}

const FormContext = React.createContext<IFormContext>({
  errors: {},
  values: {}
});

class Form extends Component<IFormProps, IState> {
  // We shared state between the components in the Form compound using React context and IFormContex interface
  public static Field: FunctionComponent<IFieldProps> = props => {
    const { name, label, type, options } = props;
    // React.ChangeEvent<HTMLInputElement>: passi all'interfaccia ChangeEvent il tipo di Elemento Html
    const handleChange = (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
      context: IFormContext
    ) => {
      if (context.setValue) {
        context.setValue(props.name, e.currentTarget.value);
      }
    };

    const handleBlur = (
      e:
        | React.FocusEvent<HTMLInputElement>
        | React.FocusEvent<HTMLTextAreaElement>
        | React.FocusEvent<HTMLSelectElement>,
      context: IFormContext
    ) => {
      if (context.validate) {
        context.validate(props.name, e.currentTarget.value);
      }
    };

    return (
      // Consume the state form Form Component
      <FormContext.Consumer>
        {context => (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {(type === "Text" || type === "Email") && (
              <input
                type={type.toLowerCase()}
                id={name}
                value={context.values[name]}
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
              />
            )}
            {type === "TextArea" && (
              <textarea
                id={name}
                value={context.values[name]}
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
              />
            )}
            {type === "Select" && (
              <select
                name=""
                id=""
                value={context.values[name]}
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
              >
                {options &&
                  options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            )}
            {context.errors[name] &&
              context.errors[name].length > 0 &&
              context.errors[name].map(error => (
                <span key={error} className="form-error">
                  {error}
                </span>
              ))}
          </div>
        )}
      </FormContext.Consumer>
    );
  };

  public constructor(props: IFormProps) {
    super(props);
    const errors: IErrors = {};
    Object.keys(props.defaultValues).forEach(fieldName => {
      errors[fieldName] = [];
    });
    this.state = {
      errors,
      submitting: false,
      submitted: false,
      values: props.defaultValues
    };
  }

  public render() {
    const context: IFormContext = {
      errors: this.state.errors,
      setValue: this.setValue,
      validate: this.validate,
      values: this.state.values
    };
    return (
      // Provide the state to the Field Component
      <FormContext.Provider value={context}>
        <form className="form" noValidate={true} onSubmit={this.handleSubmit}>
          {this.props.children}
          <div className="form-group">
            <button 
              type="submit"
              disabled={this.state.submitting || this.state.submitted}
              >Submit</button>
          </div>
        </form>
      </FormContext.Provider>
    );
  }

  private setValue = (fieldName: string, value: any) => {
    const newValues = { ...this.state.values, [fieldName]: value };
    this.setState({
      values: newValues
    });
  };
  
  private validate = (fieldName: string, value: any): string[] => {
    const rules = this.props.validationRules[fieldName];
    const errors: string[] = [];
    if (Array.isArray(rules)) {
      rules.forEach(rule => {
        const error = rule.validator(fieldName, this.state.values, rule.arg);
        if (error) {
          errors.push(error);
        }
      });
    } else {
      if (rules) {
        const error = rules.validator(fieldName, this.state.values, rules.arg);
        if (error) {
          errors.push(error);
        }
      }
    }
    const newErrors = { ...this.state.errors, [fieldName]: errors };
    this.setState({ errors: newErrors });
    return errors;
  };
  
  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.setState({submitting: true});
      const result = await this.props.onSubmit(this.state.values);
      this.setState({
        errors: result.errors || {},
        submitted: result.success,
        submitting: false
      })
    }
  }

  private validateForm = (): boolean => {
    const errors: IErrors = {};
    let haveError: boolean = false;
    Object.keys(this.props.defaultValues).map(fieldName => {
      errors[fieldName] = this.validate(
        fieldName,
        this.state.values[fieldName]
      );
      if (errors[fieldName].length > 0) {
        haveError = true;
      }
    })
    this.setState({errors})
    return !haveError;
  }

}

Form.Field.defaultProps = {
  type: "Text"
};

export default Form;
