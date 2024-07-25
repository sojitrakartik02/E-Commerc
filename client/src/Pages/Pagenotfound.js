import React from 'react'
import AppLayout from '../Compo/AppLayout/AppLayout'
import { Link } from 'react-router-dom'
const Pagenotfound = () => {
  return (
    <AppLayout title={"Page not found"}>
      <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h2 className='pmf-heading'> Oops ! Page Not Found</h2>
        <Link className="pnf-btn" to='/'>Go Back</Link>
      </div>
    </AppLayout>
  )
}

export default Pagenotfound
