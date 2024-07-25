import React from 'react'
import AppLayout from '../Compo/AppLayout/AppLayout'

const About = () => {
  return (
    <AppLayout title={"About Us -Ecommerce App"}>
      <div className='row contactus'>
        <div className='col-md-6'>
          <img src='images/about.jpeg' style={{width:"100%"}} />

        </div>
        <div className='col-md-6'>
          <p className='text-justify mt-2'>lorem</p>

        </div>

      </div>
    </AppLayout>
  )
}

export default About
