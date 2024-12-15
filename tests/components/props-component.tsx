import { FC } from 'react';

export interface PropsComponentProps {
  testId?: string;
  [key: string]: unknown | undefined;
}

const PropsComponent: FC<PropsComponentProps> = (props) => {
  const { testId = 'props-component', ...restProps } = props;
  return <div data-testid={testId}>{JSON.stringify(restProps)}</div>;
};

export default PropsComponent;
