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


// aldığı filmin id sine göre,o filmin videosunu basmak için, youtube un istediği key i getiren fonksiyon. bu key iframe e gömülecek
export const getirVideoKey=async(id)=>{

 const res= await fetch(
  `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
);

const data=await res.json()

// console.log(data.results[0].key);


return data.results[0].key;
}
