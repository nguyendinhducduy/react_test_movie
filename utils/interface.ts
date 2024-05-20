

export interface MovieStore {
    all: [];
    fetchAll: (current: string) => Promise<void>;

    movies: [];
    fetchMovies: (page : number) => Promise<void>;

    tv: [];
    fetchTV: (page : number) => Promise<void>;

    movieDetail: MovieDetai | null;
    fetchMovieDetail: (id: number) => Promise<void>;

    tvDetail: TvDetai | null;
    fetchTvDetail: (id: number) => Promise<void>;

    search: [];
    fetchSearch: (keyword: string) => Promise<void>;
}

export interface ListItem {
    id: number;
    media_type: string;
    poster_path: string;
    title: string;
    name: string;
    vote_average?: number;
}
interface BaseDetail {
    backdrop_path: string;
    poster_path: string;
    tagline: string;
    overview: string;
    vote_average: number;
    genres: { name: string }[];
}
export interface MovieDetai extends BaseDetail {
    title: string;
    release_date: string;
    runtime: number;
}
export interface TvDetai extends BaseDetail {
    name: string;
    status: string;
    first_air_date: string;
    last_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
    episode_run_time: number[];
    genres: { name: string }[];
}

export interface baseUser {
    username: string;
    password: string;
    remember: boolean
}

export interface userType {
    id : number;
    yourName: string;
    agreeTerms: boolean;
    username: string;
    password: string;
    email: string;
    authentication : boolean;
}
