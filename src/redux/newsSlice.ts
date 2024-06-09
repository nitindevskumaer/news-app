import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config";

export interface Article {
  body: string;
  title: string;
  image: string;
  author: string;
  source: string;
  date: string;
  url: string;
}

interface NewsState {
  loading: boolean;
  articles: Article[];
  error: string | null;
}

const initialState: NewsState = {
  loading: false,
  articles: [],
  error: null,
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export default newsSlice.reducer;
