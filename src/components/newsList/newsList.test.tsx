
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NewsList from './index';
import { fetchNews } from '../../redux/newsSlice';

// Mock the fetchNews function
jest.mock('../../redux/newsSlice', () => ({
  fetchNews: jest.fn(),
}));

const mockStore = configureStore([thunk] as any);

describe('NewsList Component', () => {
  let store: any;

  beforeEach(() => {
    // Initialize mock store with the default state
    store = mockStore({
      news: {
        articles: [
          { title: 'Article 1', source: 'Category 1', author: 'Author 1', date: '2024-06-01', content: 'Content 1' },
          { title: 'Article 2', source: 'Category 2', author: 'Author 2', date: '2024-06-02', content: 'Content 2' },
        ],
        loading: false,
        error: null,
      },
    });
  });

  test('renders loading spinner when loading', () => {
    store = mockStore({
      news: {
        articles: [],
        loading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    expect(screen.getByRole('status')).toBeDefined();
  });

  test('renders error message when error occurs', () => {
    store = mockStore({
      news: {
        articles: [],
        loading: false,
        error: 'Failed to fetch articles',
      },
    });

    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    expect(screen.getByText(/Error: Failed to fetch articles/i)).toBeDefined();
  });

  test('renders articles correctly', () => {
    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    expect(screen.getByText(/Article 1/i)).toBeDefined();
    expect(screen.getByText(/Article 2/i)).toBeDefined();
  });

  test('filters articles by category', () => {
    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    const categoryCheckbox = screen.getByLabelText('Category 1');
    fireEvent.click(categoryCheckbox);

    expect(screen.queryByText(/Article 2/i)).not.toBeDefined();
    expect(screen.getByText(/Article 1/i)).toBeDefined();
  });

  test('filters articles by author', () => {
    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    const authorCheckbox = screen.getByLabelText('Author 1');
    fireEvent.click(authorCheckbox);

    expect(screen.queryByText(/Article 2/i)).not.toBeDefined();
    expect(screen.getByText(/Article 1/i)).toBeDefined();
  });

  test('sorts articles by date descending', () => {
    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    const dateDescRadio = screen.getByLabelText('Date Descending');
    fireEvent.click(dateDescRadio);

    const articles = screen.getAllByRole('article');
    expect(articles[0]).toHaveProperty('Article 2');
    expect(articles[1]).toHaveProperty('Article 1');
  });

  test('sorts articles by title ascending', () => {
    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    const titleAscRadio = screen.getByLabelText('Title Ascending');
    fireEvent.click(titleAscRadio);

    const articles = screen.getAllByRole('article');
    expect(articles[0]).toHaveProperty('Article 1');
    expect(articles[1]).toHaveProperty('Article 2');
  });

  test('shows no results message when no articles match filters', () => {
    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    const categoryCheckbox = screen.getByLabelText('Nonexistent Category');
    fireEvent.click(categoryCheckbox);

    expect(screen.getByText(/No result found for Selection/i)).toBeDefined();
  });
});
