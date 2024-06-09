import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../redux/newsSlice";
import { RootState, AppDispatch } from "../../redux/store";
import styles from "./newsList.module.scss";
import Sidebar from "../sidebar";
import NewsItem from "../newsItem";
import Pagination from "../pagination";

const NewsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesPerPage = 5;

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((item) => item !== author)
        : [...prev, author]
    );
    setCurrentPage(1);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredArticles = articles
    .filter((article) =>
      selectedCategories.length
        ? selectedCategories.includes(article.source)
        : true
    )
    .filter((article) =>
      selectedAuthors.length ? selectedAuthors.includes(article.author) : true
    )
    .sort((a, b) => {
      if (sortBy === "date-desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const displayedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  if (loading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.newsList}>
      <Sidebar
        selectedCategories={selectedCategories}
        selectedAuthors={selectedAuthors}
        sortBy={sortBy}
        onCategoryChange={handleCategoryChange}
        onAuthorChange={handleAuthorChange}
        onSortByChange={handleSortByChange}
      />
      <div className={styles.newsItems}>
        {filteredArticles.length === 0 ? (
          <p className={styles.noResults}>No result found for Selection</p>
        ) : (
          displayedArticles.map((item, index) => (
            <NewsItem key={index} item={item} />
          ))
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default NewsList;
