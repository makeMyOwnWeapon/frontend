import React from 'react';
import styles from '../../styles/Pagination.module.css';
type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.paginationContainer}>
      {pageNumbers.map(number => (
        <li 
          key={number} 
          className={`${styles.pageItem} ${number === currentPage ? styles.pageItemActive : ''}`}
          onClick={() => paginate(number)}>
          {number}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
