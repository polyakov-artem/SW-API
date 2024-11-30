import { render } from '@testing-library/react';
import Icon, { IconPropsType } from './icon';

describe('Icon', () => {
  describe('when classMods, className are passed', () => {
    test('should correctly render icon with proper classes', () => {
      const view = 'telegram';
      const size = 'lg';
      const className = 'parent__icon';

      const { asFragment } = renderIcon({ className, classMods: { size, view } });

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <span
            class="icon icon_size_lg icon_view_telegram parent__icon"
          />
        </DocumentFragment>
      `);
    });
  });
});

const renderIcon = (props: IconPropsType) => render(<Icon {...props} />);
