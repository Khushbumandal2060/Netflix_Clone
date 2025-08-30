import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Titlecards.css';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjRiNGZiZmI0MTBlNjVjZTJlNTkxMGU4MGJhYTJjOCIsIm5iZiI6MTc1NjU2ODEyOC40MDEsInN1YiI6IjY4YjMxYTQwYmM5MWZkODU0NDE1Nzg1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XNvAlbL9rBRkQBk01tQpPupD2eWlSJaTitiKPb8t7Bg',
    },
  };

  // Smooth horizontal scroll on mouse wheel
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollBy({
      left: event.deltaY * 2, // scroll faster
      behavior: 'smooth',     // smooth scrolling
    });
  };

  useEffect(() => {
    // Fetch movies from TMDB API
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : 'now_playing'
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results || []))
      .catch((err) => console.error(err));

    // Add wheel event listener
    const cards = cardsRef.current;
    cards.addEventListener('wheel', handleWheel);

    // Cleanup listener on unmount
    return () => {
      cards.removeEventListener('wheel', handleWheel);
    };
  }, [category]);

  return (
    <div className='titlecards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map(
          (card, index) =>
            card.backdrop_path && (
              <Link to={`/player/${card.id}`} key={index} className='card'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.original_title}
                />
                <p>{card.original_title}</p>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default TitleCards;
