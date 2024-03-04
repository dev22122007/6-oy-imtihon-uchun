import React from "react";
import { LuSearch } from "react-icons/lu";
import "../home.css";
import image from "../../../assets/Rectangle1.png";
import { MdLocalMovies } from "react-icons/md";
import { useState, useEffect } from "react";

function Home() {
  const [recommend, setRecommend] = useState([]);
  useEffect(() => {
    fetch("https://api.kinopoisk.dev/v1.4/movie?page=8&limit=50", {
      method: "GET",
      headers: {
        "X-API-KEY": "65NMX91-YNPM06C-HVQZYZV-2D5TKKB",
      },
    })
    .then((res) => res.json())
    .then((data) => {
        setRecommend(data.docs);
      })
    .catch((err) => {
        console.log(err);
      });
  }, [])

  const detailPage = (Product) => {
    setProduct([{...Product}])
  }
  console.log(product);

  return (
    <>
      <div className="search">
        <LuSearch className="search-icon" />
        <input
          className="movie-search"
          type="text"
          placeholder="Search for movies or TV series"
        />
      </div>
      
      <div className="recommend">
        <h2 className="recommend-title">Recommended for you</h2>
        <div className="recommend-cards">

          {
            recommend.map((ul, ind) => {
              return (
                <div key={ind} onClick={() => detailPage(ul)} className="recommend-card">
                  <img className="recommend-img" src={ul.backdrop.url} alt="movie picture" />
                  <div className="recommend-title">
                    <div className="recommend-info">
                      <span> {ul.year} </span> ●{" "}
                      <MdLocalMovies className="info-movie-icon" />
                      <span> {ul.type} </span> ● <span> {ul.ageRating} </span>
                    </div>
                    {(ul.alternativeName && ul.alternativeName.length < 20) ? <h2> {ul.alternativeName} </h2> : <h2> {ul.name} </h2> }
                  </div>
                </div>
              )
            })
          }
          
        </div>
      </div>
    </>
  );
}

export default Home;
