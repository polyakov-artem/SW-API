import { Component, ErrorInfo, ReactNode } from 'react';
import './error-boundary.scss';
import Button from '../button/button';
import { NOT_FOUND_MESSAGE } from '../../../utils/load-data';
import { Navigate } from 'react-router';

interface ErrorBoundaryPropsType {
  children?: ReactNode;
}

interface ErrorBoundaryStateType {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryPropsType, ErrorBoundaryStateType> {
  constructor(props: ErrorBoundaryPropsType) {
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

    if (error?.message === NOT_FOUND_MESSAGE) {
      return <Navigate to="/not-found-page" relative="path" />;
    }

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
