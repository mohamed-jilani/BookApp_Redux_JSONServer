import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookApi } from '../services/api';

const initialState = {
  books: [],
  status: 'idle',
  error: null,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const response = await bookApi.getAll();
    return response.data;
  }
);

export const addBookAsync = createAsyncThunk(
  'books/addBook',
  async (bookData) => {
    const response = await bookApi.create(bookData);
    return response.data;
  }
);

export const editBookAsync = createAsyncThunk(
  'books/editBook',
  async ({ id, ...bookData }) => {
    const response = await bookApi.update(id, bookData);
    return response.data;
  }
);

export const deleteBookAsync = createAsyncThunk(
  'books/deleteBook',
  async (id) => {
    await bookApi.delete(id);
    return id;
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch books
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add book
      .addCase(addBookAsync.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      // Edit book
      .addCase(editBookAsync.fulfilled, (state, action) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      // Delete book
      .addCase(deleteBookAsync.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book.id !== action.payload);
      });
  },
});

export default bookSlice.reducer;
