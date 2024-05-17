
export const API = {
    ALL: (currentTab: string) => `trending/${currentTab}/week?language=en-US`,

    TV: 'trending/tv/week?language=en-US&page=2',
    TV_DETAIL: (id: number) => `tv/${id}?language=en-US`,

    MOVIE: `trending/movie/week?language=en-US`,
    MOVIE_DETAIL: (id: number) => `movie/${id}?language=en-US`,

    SEARCH: (keyword: string) => `search/multi?query=${keyword}&include_adult=false&language=en-US`,

    BACKDROP_PATH: (url: string) => `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${url}`,
    POSTER_PATH: (url: string) => `https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${url}`,
}