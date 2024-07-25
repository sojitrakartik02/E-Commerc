import React from 'react'
import AppLayout from '../../Compo/AppLayout/AppLayout.js'
import UserMenu from '../../Compo/AppLayout/UserMenu.js'
import { useAuth } from '../../Context/auth.js'


const Dashboard = () => {
  const[auth]=useAuth()
  return (
    <AppLayout>
      <div title={"Dashboard - Ecommerce app"}>
      <div className='container-fluid p-3 m-3'>
        <div className='row'>
        <div className='col-md-3'>
            <UserMenu />
        </div>
        <div className='col-md-9'>
          <div className='card w-75 p-3'>
 
            <h1>{auth?.user?.name}</h1>
            <h1>{auth?.user?.email}</h1>
            <h1>{auth?.user?.address}</h1>
          </div>
        </div>
        </div>
      </div>
      </div>
    </AppLayout>
  )
}

export default Dashboard
