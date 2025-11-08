import React from "react";
import { list, list5 } from "../../data/Data";
import { Link } from "react-router-dom";

const RecentCard = () => {
  return (
    <>
    
      <div className="content grid3 mtop">
        {
        
        list.map((val, index) => {
          const { cover, location, name, price, HREF, route } = val;
          return (
            <div className="box shadow" key={index}>
              <div className="img">
                <img src={cover} alt="" />
              </div>
              <div className="text">
                {/* <div className="category flex gap-2 text-red-500 text-xl">
                  {[...Array(5)].map((_, i) => (
                    <i className="fa fa-heart" key={i}></i>
                  ))}
                </div> */}
                <h4>{name}</h4>
                {/* <p>
                  <i className="fa fa-location-dot"></i> {location}
                </p> */}
              </div>
              <div
                className="button flex justify-between items-center w-full"
                style={{ transform: "translateX(-30px)" }}
              >
                <label>{price}</label>
                {HREF ? (
                  <a href={HREF} target="_blank" rel="noopener noreferrer">
                    <button className="btn2">Start</button>
                  </a>
                ) : (
                  <Link to={route || `/Usage${name}`}>
                    <button className="btn2">Start</button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Second list section */}
      <div className="content grid3 mtop">
        {list5.map((val, index) => {
          const { cover, location, name, price, HREF, route } = val;
          return (
            <div className="box shadow" key={index}>
              <div className="img">
                <img src={cover} alt="" />
              </div>
              <div className="text">
                <h4>{name}</h4>
                
              </div>
              <div className="button flex justify-between items-center w-full">
               <h3>{price}</h3>
                {HREF ? (
                  <a href={HREF} target="_blank" rel="noopener noreferrer">
                    <button className="btn2">Start</button>
                  </a>
                ) : (
                  <Link to={route || `/Usage${name}`}>
                    <button className="btn2">Start</button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
