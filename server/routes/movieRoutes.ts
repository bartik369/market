import express, { Request, Response } from 'express';
import Movie from '../models/media/movie';
import Favorite from '../models/media/favotite';
import multer from 'multer';

const router = express.Router();

const moviePoster = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, `${process.env.UPLOADS_MOVIES_PICS}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

router.post(`${process.env.API_MOVIES}`, async (req: Request, res: Response) => {
  try {
    const { category, country, year, rating } = req.body;

    if (
      category.length > 0 ||
      country.length > 0 ||
      year.length > 0 ||
      rating.length > 0
    ) {
      const filterData = await Movie.find({
        genre: { $in: category },
      });

      if (filterData) return res.json(filterData);
    } else {
      const movieData = await Movie.find({});
      if (movieData) return res.json(movieData);
    }
  } catch (error) {
    return error;
  }
});

router.get(`${process.env.API_LAST_MOVIES}`, async (req: Request, res: Response) => {
  try {
    const moviesData = await Movie.find().sort({ $natural: -1 }).limit(12);
    return res.json(moviesData);
  } catch (error) {
    return error;
  }
});

router.get(`${process.env.API_TOP_MOVIES}`, async (req: Request, res: Response) => {
  try {
    const moviesData = await Movie.find({
      rating: { $gt: 7 },
    });
    console.log(moviesData);
    return res.json(moviesData);
  } catch (error) {
    return error;
  }
});

router.get(`${process.env.API_MOVIE}`, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movieData = await Movie.findOne({ _id: id });

    if (movieData) {
      return res.json(movieData);
    }
  } catch (error) {
    return error;
  }
});

router.post(`${process.env.API_SEARCH_MOVIE}`, async (req: Request, res: Response) => {
  try {
    const { search } = req.body;
    const movieData = await Movie.find({
      titleRu: { $options: 'i', $regex: search },
    });
    return res.json(movieData);
  } catch (error) {
    return error;
  }
});

router.post(`${process.env.API_ADD_MOVIE}`, multer({ storage: moviePoster }).any(),
  async (req: Request, res: Response) => {
    try {
      const {titleEn, titleRu, genre, year, country, description, 
        director, ageCategory, time, actors,
      } = req.body;

      const movieData = new Movie({
        titleEn: titleEn,
        titleRu: titleRu,
        picture: req.files[0].originalname,
        trailer: req.files[1]?.originalname || '',
        genre: genre.split(','),
        year: year,
        country: country,
        description: description,
        director: director,
        ageCategory: ageCategory,
        time: time,
        rating: 0,
        actors: actors.split(','),
      });
      await movieData.save();
    } catch (error) {
      return error;
    }
  }
);
router.post(`${process.env.API_SET_RATING}`, async (req: Request, res: Response) => {
  try {
    const { value, id } = req.body;
    const movieData = await Movie.findById(id);

    if (movieData) {
      const ratingData = await Movie.findByIdAndUpdate(id, {
        rating:
          movieData.rating === 0
            ? value + movieData.rating
            : (value + movieData.rating) / 2,
      });
      await ratingData.save();
      const newData = await Movie.findById(id);
      return res.json(newData);
    }
  } catch (error) {
    return error;
  }
});

router.post(`${process.env.API_ADD_FAVORITE}`, async (req: Request, res: Response) => {
  try {
    const { userId, movieId } = req.body;
    const existRecord = await Favorite.findOne({ userId: userId });
    if (!existRecord) {
      const newRecord = new Favorite({
        userId: userId,
        movies: movieId,
      });
      await newRecord.save();
      return res.json(newRecord);
    } else {
      const existFavotite = await Favorite.findOne({
        movies: { $all: movieId },
      });

      if (existFavotite) {
        const removeFavorite = await Favorite.findByIdAndUpdate(
          existRecord._id,
          {
            $pull: { movies: movieId },
          }
        );
        return res.json(removeFavorite);
      } else {
        const newData = await Favorite.findByIdAndUpdate(existRecord._id, {
          $push: { movies: movieId },
        });
        await newData.save();
        console.log(newData);
        return res.json(newData);
      }
    }
  } catch (error) {
    return error;
  }
});

router.get(`${process.env.API_MOVIE_PROPERTIES}`, async (req: Request, res: Response) => {
  try {
    const genre: string[] = [];
    const country: string[] = [];
    const year: string[] = [];
    const rating: number[] = [];
    const movieData = await Movie.find({});
    movieData.map((item) => {
      item.genre.map((el) => {
        genre.push(el);
      });
      country.push(item.country);
      year.push(item.year);
      rating.push(item.rating);
    });
    const genreArr = genre.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    const countryArr = country.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    const yearArr = year.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    const ratingArr = rating.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    return res.json({ genreArr, countryArr, yearArr, ratingArr });
  } catch (error) {
    return error;
  }
});

router.post(`${process.env.API_MOVIE_FAVORITES}`, async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const favoriteData = await Favorite.findOne({ userId: id });

    if (favoriteData) {
      return res.json(favoriteData);
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
});

export default router;
