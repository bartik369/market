import React, {FC} from 'react';
import { IMovie } from '../../types/media';

interface IMovieProps {
    movie: IMovie
}

const Poster: FC<IMovieProps> = ({movie}) => {
    return (
        <div>
            {movie.title}
            {movie.category}
            {movie.description}
            {movie.year}
            {movie.country}
            {movie.director}
        </div>
    );
};

export default Poster;