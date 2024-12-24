import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
}

interface MovieState {
  movies: Movie[];
}

const initialState: MovieState = {
  movies: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
     addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    updateMovie: (state, action: PayloadAction<Movie>) => {
      const index = state.movies.findIndex(movie => movie.id === action.payload.id);
      if (index !== -1) {
        state.movies[index] = action.payload;
      }
    },
    deleteMovie: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { addMovie, updateMovie, deleteMovie } = movieSlice.actions;
export default movieSlice.reducer;
