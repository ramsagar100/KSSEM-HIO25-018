import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        
        {/* UX Improvement: 
          Replaced the 'flex mtop' container with a clearer 2-column wrapper.
          Instead of three separate divs (left, left, right), we now have 
          two distinct columns: 'about-content' and 'about-image'
          for better readability and layout management.
        */}
        <div className='container about-wrapper'>
          
          {/* --- COLUMN 1: TEXT CONTENT --- */}
          <div className='about-content'>
            <Heading title='System Overview and Functionality' subtitle='Check out our company story and work process' />

            <p>
              At Smart AquaTech, we are passionate about building sustainable solutions that blend technology with everyday life. Our flagship innovation — the Smart Home Water Management System — is designed to empower individuals, households, and communities to conserve water effortlessly while maintaining lush, healthy gardens and landscapes.
            </p>
            <p>
              Founded by a team of tech enthusiasts and problem-solvers, our mission is simple: optimize water usage through smart automation and data-driven decisions. Leveraging IoT technologies like the ESP8266, soil moisture sensors, and real-time data tracking through mobile apps, our system brings precision, convenience, and eco-consciousness to your fingertips.
            </p>
            
            {/* UI Improvement: 
              Using a semantic <h3> here is better than a full <Heading> component
              with a repetitive subtitle.
            */}
            <h3>Monitoring, Alerts, and Impact</h3>
            <p>
              We believe that small actions lead to big impact. By making water management intelligent and accessible, we aim to contribute to a future where water is used wisely — not wasted.
            </p>
            <p>
              Join us in creating a smarter, greener world — one drop at a time.
            </p>
            {/* UX Improvement: 
              Removed the "More About Us" button. It's confusing to have
              a "more about us" link when the user is already on the About Us page.
            */}
          </div>

          {/* --- COLUMN 2: IMAGE --- */}
          <div className='about-image'>
            {/* Accessibility Improvement: 
              Added descriptive alt text for screen readers.
            */}
            <img src='./immio.jpg' alt='A diagram or illustration of the Smart AquaTech system' />
          </div>

        </div>
      </section>
    </>
  )
}

export default About