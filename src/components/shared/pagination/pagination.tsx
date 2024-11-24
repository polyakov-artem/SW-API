import './pagination.scss';
import { FC, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { NUMBERS_PLACEHOLDER, getPaginationRange } from './get-pagination-range';
import { getBaseUrlForPageParam } from './pagination-utils';

export const BASE_CLASS_NAME = 'pagination';
export const itemClassName = `${BASE_CLASS_NAME}__item`;
export const btnClassName = `${BASE_CLASS_NAME}__btn`;
export const placeholderClassName = `${BASE_CLASS_NAME}__placeholder`;
export const btnSelectedClassName = `${btnClassName}_selected`;
export const btnDisabledClassName = `${BASE_CLASS_NAME}__btn_disabled`;
export const nextBtnClassName = `${BASE_CLASS_NAME}__btn-next`;
export const prevBtnClassName = `${BASE_CLASS_NAME}__btn-prev`;

export type PaginationPropsType = {
  totalCount: number | undefined;
  perPageCount: number;
  maxNumOfVisiblePages?: number;
  className?: string;
  prevBtnLabel?: ReactNode;
  nextBtnLabel?: ReactNode;
};

const MINIMAL_NUMBER_MESSAGE = 'Number of visible pages should be at least 7';

const Pagination: FC<PaginationPropsType> = ({
  perPageCount,
  className,
  totalCount = 0,
  maxNumOfVisiblePages = 7,
  prevBtnLabel = '«',
  nextBtnLabel = '»',
}) => {
  const [queries] = useSearchParams();
  const currentPageParam = queries.get('page');
  const parsedPageNumber = parseInt(currentPageParam || '');
  const currentPage = isNaN(parsedPageNumber) || parsedPageNumber <= 0 ? 1 : parsedPageNumber;
  const numberOfPages = Math.ceil(totalCount / perPageCount);

  if (maxNumOfVisiblePages < 7) throw new Error(MINIMAL_NUMBER_MESSAGE);

  const paginationRange = useMemo(
    () =>
      getPaginationRange({
        numberOfPages,
        numOfVisibleButtons: maxNumOfVisiblePages,
        currentPage,
      }),
    [numberOfPages, maxNumOfVisiblePages, currentPage]
  );

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

  const links = paginationRange?.map((number, index) => {
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
