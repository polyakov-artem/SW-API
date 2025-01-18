import './download-dialog.scss';
import classNames from 'classnames';
import { ComponentProps, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { removeDownloadItems, selectDownloadItems } from '../../../store/download-items-slice';
import Button from '../../shared/button/button';
import { getFirstPathNamePart } from '../../../utils/get-first-pathname-part';
import { downloadData } from '../../../utils/download-data';

export const BASE_CLASS_NAME = 'download-dialog';
export const activeDialogClassName = `${BASE_CLASS_NAME}_active`;
export const buttonsWrapClassName = `${BASE_CLASS_NAME}__buttons-wrap`;
export const dialogMsgClassName = `${BASE_CLASS_NAME}__message`;
export const dialogTestId = 'download-dialog';

const DownloadDialog: FC<ComponentProps<'div'>> = (props) => {
  const dispatch = useAppDispatch();
  const downloadItems = useAppSelector(selectDownloadItems);
  const itemsCount = Object.keys(downloadItems).length;

  const { className, ...restProps } = props;
  const classes = classNames(BASE_CLASS_NAME, { [activeDialogClassName]: !!itemsCount }, className);
  let message = 'No items selected';

  if (itemsCount !== 0) {
    message = itemsCount === 1 ? `${itemsCount} item is selected` : `${itemsCount} items selected`;
  }

  const handleUnselectBtnClick = () => {
    dispatch(removeDownloadItems());
  };

  const handleDownloadBtnClick = () => {
    const filename = `${itemsCount}_${getFirstPathNamePart()}`;
    const data = Object.values(downloadItems).map((item) =>
      Object.fromEntries(
        Object.entries(item).map(([key, value]) => {
          if (value instanceof Object) return [key, JSON.stringify(value)];
          return [key, value];
        })
      )
    );
    if (data.length) {
      downloadData(filename, data);
    }
  };

  return (
    <div className={classes} {...restProps} data-testid={dialogTestId}>
      <p className={dialogMsgClassName}>{message}</p>
      <div className={buttonsWrapClassName}>
        <Button classMods={{ view: 'primary' }} onClick={handleDownloadBtnClick}>
          Download
        </Button>
        <Button classMods={{ view: 'primary' }} onClick={handleUnselectBtnClick}>
          Unselect all
        </Button>
      </div>
    </div>
  );
};

export default DownloadDialog;
