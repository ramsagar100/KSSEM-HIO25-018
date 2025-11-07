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
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title=' System Overview and Functionality' subtitle='Check out our company story and work process' />

            <p>---

About Us

At Smart AquaTech, we are passionate about building sustainable solutions that blend technology with everyday life. Our flagship innovation — the Smart Home Water Management System — is designed to empower individuals, households, and communities to conserve water effortlessly while maintaining lush, healthy gardens and landscapes.

Founded by a team of tech enthusiasts and problem-solvers, our mission is simple: optimize water usage through smart automation and data-driven decisions. Leveraging IoT technologies like the ESP8266, soil moisture sensors, and real-time data tracking through mobile apps, our system brings precision, convenience, and eco-consciousness to your fingertips.</p>
            {/* <button className='btn2'>More About Us</button> */}
          </div>
          <div className='left row'>
            <Heading title='Monitoring, Alerts, and Impact' subtitle='Check out our company story and work process' />

            <p>We believe that small actions lead to big impact. By making water management intelligent and accessible, we aim to contribute to a future where water is used wisely — not wasted.

Join us in creating a smarter, greener world — one drop at a time.


---

Would you like a version of this that highlights your personal journey and achievements too? I can personalize it to include your background and team efforts.</p>
            <button className='btn2'>More About Us</button>
          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
