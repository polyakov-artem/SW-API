import { Component, ErrorInfo, ReactNode } from 'react';
import './error-boundary.scss';
import Button from '../button/button';

interface TErrorBoundaryProps {
  children?: ReactNode;
}

interface TErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<TErrorBoundaryProps, TErrorBoundaryState> {
  constructor(props: TErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: unknown) {
    console.log('error', error);
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('error', error);
    console.log('errorInfo', errorInfo);
  }

  handleClick = () => window.location.reload();

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <main className="error-boundary">
          <div className="container">
            <h1>An unexpected error has occurred. Please reload the page later</h1>
            <Button onClick={this.handleClick} classMods={{ view: 'primary' }}>
              Reload
            </Button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
