import { create } from 'zustand';
import axios from '@/utils/axios';
import { API } from '@/utils/api';
import { MovieStore } from '@/utils/interface';

const apiKey: string = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey,
    },
};

const fetchData = async (url: string) => {
    try {
        const response = await axios.get(url, options);
        const data = await response.data;
        // console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const useMovieStore = create<MovieStore>((set) => ({

    all: [],
    fetchAll: async (current: string) => {
        const moviesData = await fetchData(API.ALL(current));
        set({ all: moviesData["results"] });
    },

    movies: [],
    fetchMovies: async () => {
        const moviesData = await fetchData(API.MOVIE);
        set({ movies: moviesData["results"] });
    },

    tv: [],
    fetchTV: async () => {
        const tvData = await fetchData(API.TV);
        set({ tv: tvData["results"] });
    },

    movieDetail: null,
    fetchMovieDetail: async (id: number) => {
        const movieDetailData = await fetchData(API.MOVIE_DETAIL(id));
        set({ movieDetail: movieDetailData });
    },

    tvDetail: null,
    fetchTvDetail: async (id: number) => {
        const tvDetailData = await fetchData(API.TV_DETAIL(id));
        set({ tvDetail: tvDetailData });
    },

    search: [],
    fetchSearch: async (keyword: string) => {
        const searchData = await fetchData(API.SEARCH(keyword));
        set({ search: searchData["results"] });
    },
}));