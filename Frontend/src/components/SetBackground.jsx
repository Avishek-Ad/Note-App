import React from 'react'
import bgImage from "../assets/bgImg.jpeg"

const SetBackground = () => {
  return (
    <img className="fixed opacity-75 w-1/2 h-3/4 top-24 right-0" src={bgImage} alt='background image'/>
  )
}

export default SetBackground