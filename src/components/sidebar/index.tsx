import React from 'react';
import { AUTHOR_ARRAY, CATEGORY_ARRAY } from "../../config";
import styles from "../newsList/newsList.module.scss";

const Sidebar: React.FC<{
  selectedCategories: string[];
  selectedAuthors: string[];
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onAuthorChange: (author: string) => void;
  onSortByChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = React.memo(({ 
  selectedCategories,
  selectedAuthors,
  sortBy,
  onCategoryChange,
  onAuthorChange,
  onSortByChange,
}) => (
  <div className={styles.sidebar}>
    <div className={styles.category}>
      <h3>Category</h3>
      <ul>
        {CATEGORY_ARRAY.map((category) => (
          <li key={category}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
              />
              {category}
            </label>
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.author}>
      <h3>Author</h3>
      <ul>
        {AUTHOR_ARRAY.map((author) => (
          <li key={author}>
            <label>
              <input
                type="checkbox"
                checked={selectedAuthors.includes(author)}
                onChange={() => onAuthorChange(author)}
              />
              {author}
            </label>
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.sortBy}>
      <h3>Sort By</h3>
      <div>
        <p>Date</p>
        <label>
          <input
            type="radio"
            value="date-desc"
            checked={sortBy === "date-desc"}
            onChange={onSortByChange}
          />
          Latest to Earliest
        </label>
        <label>
          <input
            type="radio"
            value="date-asc"
            checked={sortBy === "date-asc"}
            onChange={onSortByChange}
          />
          Earliest to Latest
        </label>
      </div>
      <div>
        <p>Title</p>
        <label>
          <input
            type="radio"
            value="title-asc"
            checked={sortBy === "title-asc"}
            onChange={onSortByChange}
          />
          Ascending
        </label>
        <label>
          <input
            type="radio"
            value="title_desc"
            checked={sortBy === "title-desc"}
            onChange={onSortByChange}
          />
          Descending
        </label>
      </div>
    </div>
  </div>
));

export default Sidebar;
