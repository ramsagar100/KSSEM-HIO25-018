import React from "react"
import "./blog.css"
import RecentCard from "../home/recent/RecentCard"
// import { Community1 } from "../data/Data"
import { Link } from "react-router-dom"
const Blog = () => {
  return (
    <>
    <main>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <input type="text" placeholder="Search Community" />
  <button className="search-btn">Search</button>
</div>

      <div className="content grid3 mtop">
              {Community1.map((val, index) => {
                const { cover, location, name, price, HREF, route } = val;
                return (
                  <div className="box shadow" key={index}>
                    <div className="img">
                      <img src={cover} alt="" />
                    </div>
                    <div className="text">
                      <div className="category flex gap-2 text-red-500 text-xl">
                        {[...Array(5)].map((_, i) => (
                          <i className="fa fa-heart" key={i}></i>
                        ))}
                      </div>
                      <h4>{name}</h4>
                      <p>
                        <i className="fa fa-location-dot"></i> {location}
                      </p>
                    </div>
                    <div
        className="button flex justify-between items-center w-full"
        style={{ transform: "translateX(-30px)" }}
      >
        <label>{price}</label>
        <button className="btn2">Join Community</button>
      </div>
      
                  </div>
                );
              })}
            </div>

      </main>
    </>
  )
}

export default Blog
