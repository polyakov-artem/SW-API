import { Component, ErrorInfo, ReactNode } from 'react';
import './error-boundary.scss';
import Button from '../button/button';

interface ErrorBoundaryPropsType {
  children: ReactNode;
}

interface ErrorBoundaryStateType {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryPropsType, ErrorBoundaryStateType> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('error', error);
    console.log('errorInfo', errorInfo);
  }

  handleClick = () => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <div className="container">
            <h1>An unexpected error has occurred. Please reload the page later</h1>
            <Button onClick={this.handleClick}>Reload</Button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
