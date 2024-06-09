import React from 'react';
import styles from  './notFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundContent}>
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <a href="/" className={styles.backHome}>
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
