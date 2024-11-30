import './pagination.scss';
import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { NUMBERS_PLACEHOLDER, usePaginationRange } from './usePagination';

const BASE_CLASS_NAME = 'pagination';
const itemClassName = `${BASE_CLASS_NAME}__item`;
const btnClassName = `${BASE_CLASS_NAME}__btn`;
const placeholderClassName = `${BASE_CLASS_NAME}__placeholder`;
const btnSelectedClassName = `${btnClassName}_selected`;
const btnDisabledClassName = `${BASE_CLASS_NAME}__btn_disabled`;
const nextBtnClassName = `${BASE_CLASS_NAME}__btn-next`;
const prevBtnClassName = `${BASE_CLASS_NAME}__btn-prev`;

export type PaginationPropsType = {
  totalCount: number | undefined;
  perPageCount: number;
  currentPageParam: string;
  numOfVisibleButtons: number;
  className?: string;
  prevBtnLabel?: ReactNode;
  nextBtnLabel?: ReactNode;
};

const MINIMAL_NUMBER_MESSAGE = 'Number of visible buttons should be at least 7';

const getBaseUrlForPageParam = (url: string) => {
  const clearedPath = url.replace(/\?(page=.*&)|(&page=[^&]*)/i, '');
  const hasEndSlash = /\/$/.test(clearedPath);
  const hasParams = /\/\?/.test(clearedPath);
  const pageParamString = 'page=';
  return `${clearedPath}${hasParams ? `&${pageParamString}` : hasEndSlash ? `?${pageParamString}` : `/?${pageParamString}`}`;
};

const Pagination: FC<PaginationPropsType> = ({
  currentPageParam,
  perPageCount,
  className,
  totalCount = 0,
  numOfVisibleButtons,
  prevBtnLabel = '«',
  nextBtnLabel = '»',
}) => {
  const parsedPageNumber = parseInt(currentPageParam);
  const currentPage = isNaN(parsedPageNumber) || parsedPageNumber <= 0 ? 1 : parsedPageNumber;
  const numberOfPages = Math.ceil(totalCount / perPageCount);

  if (numOfVisibleButtons < 7) throw new Error(MINIMAL_NUMBER_MESSAGE);

  const pageNumbers = usePaginationRange({ numberOfPages, numOfVisibleButtons, currentPage });

  if (!totalCount || totalCount <= perPageCount) return null;

  const baseUrl = getBaseUrlForPageParam(window.location.href);
  const isLastPage = currentPage === numberOfPages;
  const isFirstPage = currentPage === 1;

  const prevBtnClasses = classNames(btnClassName, prevBtnClassName, {
    [btnDisabledClassName]: isFirstPage,
  });

  const prevBtn = (
    <li className={itemClassName}>
      {isFirstPage ? (
        <span className={prevBtnClasses}>{prevBtnLabel}</span>
      ) : (
        <Link className={prevBtnClasses} to={`${baseUrl}${currentPage - 1}`}>
          {prevBtnLabel}
        </Link>
      )}
    </li>
  );

  const nextBtnClasses = classNames(btnClassName, nextBtnClassName, {
    [btnDisabledClassName]: isLastPage,
  });

  const nextBtn = (
    <li className={itemClassName}>
      {isLastPage ? (
        <span className={nextBtnClasses}>{nextBtnLabel}</span>
      ) : (
        <Link className={nextBtnClasses} to={`${baseUrl}${currentPage + 1}`}>
          {nextBtnLabel}
        </Link>
      )}
    </li>
  );

  const links = pageNumbers?.map((number, index) => {
    const linkClassName = classNames(btnClassName, {
      [btnSelectedClassName]: currentPage === number,
    });

    return (
      <li className={itemClassName} key={`${index}_${number}`}>
        {number === NUMBERS_PLACEHOLDER ? (
          <span className={placeholderClassName}>{number}</span>
        ) : (
          <Link className={linkClassName} to={`${baseUrl}${number}`}>
            {number}
          </Link>
        )}
      </li>
    );
  });

  const paginationClasses = classNames(BASE_CLASS_NAME, className);

  return (
    <ul className={paginationClasses}>
      {prevBtn}
      {links}
      {nextBtn}
    </ul>
  );
};

export default Pagination;
