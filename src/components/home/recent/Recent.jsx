import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"
import Usage from "../../Usgae/Usage"
const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='home' subtitle='
Saving water at home helps preserve this vital resource for future generations and reduces your utility bills. Simple habits like fixing leaks and turning off taps while brushing can make a big difference.' />
          <RecentCard />
          
        </div>
      </section>
    </>
  )
}

export default Recent
