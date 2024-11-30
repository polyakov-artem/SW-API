import { render } from '@testing-library/react';
import SvgIcon, { SvgIconPropsType } from './svg-icon';

describe('SvgIcon', () => {
  describe('when classMods, className are passed', () => {
    test('should correctly render with proper classNames', () => {
      const view = 'telegram';
      const size = 'lg';
      const className = 'parent__icon';

      const { asFragment } = renderIcon({ className, classMods: { size, view } });

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <svg
            class="svg-icon svg-icon_size_lg svg-icon_view_telegram parent__icon"
          >
            <use
              xlink:href="#telegram"
            />
          </svg>
        </DocumentFragment>
      `);
    });
  });
});

const renderIcon = (props: SvgIconPropsType) => render(<SvgIcon {...props} />);
