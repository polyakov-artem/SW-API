import { render } from '@testing-library/react';
import Loader, { LoaderPropsType } from './loader';

const renderLoader = ({ ...props }: LoaderPropsType) => render(<Loader {...props} />);

describe('Loader', () => {
  describe('when className, classMods are passed', () => {
    test(`should render correctly with proper classes`, () => {
      const { asFragment } = renderLoader({
        className: 'parent__loader',
        classMods: { 'full-space': true, size: 'lg' },
      });

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <span
            class="loader loader_full-space loader_size_lg parent__loader"
          >
            <span
              class="loader__container"
            />
          </span>
        </DocumentFragment>
      `);
    });
  });
});
