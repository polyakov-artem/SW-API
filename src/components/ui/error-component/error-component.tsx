import { Component, ReactNode } from 'react';
import Button from '../../shared/button/button';
import './error-component.scss';

interface ErrorComponentPropsType {
  children?: ReactNode;
}

interface ErrorComponentStateType {
  error: boolean;
}

class ErrorComponent extends Component<ErrorComponentPropsType, ErrorComponentStateType> {
  state = { error: false };

  handlerClick = () => {
    this.setState({ error: true });
  };

  render() {
    return (
      <div className="error-component">
        <Button onClick={this.handlerClick}>Cause error</Button>
        {this.state.error && <RuntimeError />}
      </div>
    );
  }
}

const RuntimeError = () => {
  throw new Error('Oops, something went wrong!');
};

export default ErrorComponent;
