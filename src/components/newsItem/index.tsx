import React from 'react';
import { PLACEHOLDER_URL } from "../../config";
import { Article } from "../../redux/newsSlice";
import { stripHtmlTags } from "../../utils";
import styles from "../newsList/newsList.module.scss";

const NewsItem: React.FC<{ item: Article }> = ({ item }) => (
  <div className={styles.newsItem}>
    <div className={styles.header}>
      <img
        src={item.image || PLACEHOLDER_URL}
        alt="News Thumbnail"
        className={styles.thumbnail}
        onError={(e) => (e.currentTarget.src = PLACEHOLDER_URL)}
      />
      <div className={styles.info}>
        <div className={styles['date-source']}>
          <p className={styles.date}>{new Date(item.date).toLocaleDateString()}</p>
          <p className={styles.source}>{item.source}</p>
        </div>
        <h2 className={styles.title}>{item.title}</h2>
      </div>
    </div>
    <div className={styles.contentWrapper}>
      <p className={styles.content}>{stripHtmlTags(item.body)}</p>
      <p className={styles.author}>{item.author}</p>
    </div>
  </div>
);

export default NewsItem;
