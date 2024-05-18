
export const API = {
    ALL: (currentTab: string) => `trending/${currentTab}/week?language=en-US`,

    TV: (page : number) => `trending/tv/week?language=en-US&page=${page || 1}`,
    TV_DETAIL: (id: number) => `tv/${id}?language=en-US`,

    MOVIE: (page : number) => `trending/movie/week?language=en-US&page=${page || 1}`,
    MOVIE_DETAIL: (id: number) => `movie/${id}?language=en-US`,

    SEARCH: (keyword: string) => `search/multi?query=${keyword}&include_adult=false&language=en-US`,

    BACKDROP_PATH: (url: string) => `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${url}`,
    POSTER_PATH: (url: string) => `https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${url}`,
}