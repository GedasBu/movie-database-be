import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const MovieSchema = new mongoose.Schema<Movie>({
  email: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  backdropPath: {
    type: String,
    required: false,
  },
  posterPath: {
    type: String,
    required: false,
  },
  voteAverage: {
    type: Number,
    required: false,
  },
}).plugin(paginate);

export const MovieModel = mongoose.model<Movie>('myMovies', MovieSchema);
