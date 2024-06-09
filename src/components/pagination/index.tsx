import React from 'react';
import styles from "../newsList/newsList.module.scss";

const Pagination: React.FC<{
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}> = ({ totalPages, currentPage, onPageChange }) => (
  <div className={styles.pagination}>
    <button
      className={styles.pageButton}
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      &lt;
    </button>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        className={`${styles.pageButton} ${
          currentPage === page ? styles.active : ""
        }`}
        onClick={() => onPageChange(page)}
      >
        {page}
      </button>
    ))}
    <button
      className={styles.pageButton}
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      &gt;
    </button>
  </div>
);

export default Pagination;
