import "../../components/css/arches.css";
import "../../components/css/scroll.css";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PARK_BY_ID } from "../../utils/queries";
import { useParams } from 'react-router-dom'
import up from "../../components/assets/up-arrow.jpg";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import bikingArches from "../../components/assets/biking-arches.jpg";

function Park() {
  const { parkId } = useParams();
  console.log(parkId)

  const { loading, data } = useQuery(QUERY_PARK_BY_ID, {
    variables: { parkId: parkId},
  });
  const park = data?.park || {};
  console.log(park)
  const activities1 = park.activities1 || [];
  const activities2 = park.activities2 || [];
  const image = park.images || [];

  console.log(activities1);
  console.log(activities2);

  const [current, setCurrent] = useState(0); // for next & prev slides
  const length = image.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // set auto interval on page load
  // useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCurrent(current === length - 1 ? 0 : current + 1);
  //     }, 2500);
  //     return () => clearInterval(interval);
  //   }
  // );
  // const {loading, data} = useQuery()

  return (
    <div>
      <div id="center-all">
        <h1 className="park-name">{park.name}</h1>
        <h2 className="city">{park.address}</h2>
        <div className="slider">
          <FaArrowAltCircleLeft
            className="slider-icon left-arrow"
            onClick={prevSlide}
          />
          <FaArrowAltCircleRight
            className="slider-icon right-arrow"
            onClick={nextSlide}
          />
          {image.map((slide, index) => {
            return (
              <div className="current-and-index">
                <div
                  className={index === current ? "slide active" : "slide"}
                  key={index}
                >
                  {index === current && (
                    <img src={slide} alt="images" className="image" />
                  )}
                </div>
                <div className="slider-total">
                  <img src={slide} alt="images" className="image-small" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <a href="#top">
        <img id="up-arrow" src={up} />
      </a>
      <div className="activities">
        <h3 className="activity-header">Activities</h3>
        <img id="bike" src={bikingArches} />
        <div className="split-act">
          <ul className="activity-list">
            {activities1.map((activity, index) => (
              <div className="act-left">
                <li key={index}>
                  <i class="fas fa-campground"></i>
                  {activity}
                </li>
              </div>
            ))}
            {activities2.map((activity, index) => (
              <div className="act-right">
                <li key={index}>
                  <i class="fas fa-campground"></i>
                  {activity}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="weather-section">
        <h4 className="weather-headline">Seasonal Weather</h4>
        <div className="weather-block">
          <p>{park.weatherInfo}</p>
        </div>

        <p>park description:{park.description}</p>
        <p>
          lat:{park.lat}, long:{park.long}
        </p>
      </div>
      <>
        <button>Click me</button>
      </>
      <div className="official-link">
        <a href="https://www.nps.gov/arch/index.htm" target="_">
          insert Offical Site
        </a>
      </div>
    </div>
  );
}

export default Park;
