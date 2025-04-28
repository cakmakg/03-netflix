// movie lerle ilgili verileri çektiğimiz dosya

const API_KEY = process.env.TMDB_KEY;

// istediğimiz her türlü filmi (upcoming, popular vs getiren fonk)
export const getirMovies = async (type) => {

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`
    );

    const { results } = await res.json();

    return results;
 
};