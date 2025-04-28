import { getirMovies } from '@/helpers/movieFunctions'
import Image from 'next/image';
import React from 'react'

const MovieSection = async({type}) => {

  const filmler = await getirMovies(type);


  return (
    <div className="mb-4">
    <p className="text-white  text-md lg:text-2xl font-semibold mb-4">
        {type.toUpperCase()}
    </p>

    <div className="grid grid-flow-col gap-2 overflow-x-scroll ">
      {filmler.map((a) => (
        <div className="w-40 h-[240] cursor-pointer relative">
          <Image
            width={160}
            height={240}
            src={`https://image.tmdb.org/t/p/w1280${a.poster_path}`}
          />
          <span>{a.vote_average}</span>
        </div>
      ))}
    </div>
  </div>
  );
}

export default MovieSection