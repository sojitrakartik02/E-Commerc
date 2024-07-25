import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>

            <div className='text-center'>
                <div class="list-group">
                    <h1>Dashboard</h1>
                    <NavLink to='/dashboard/user/profile' className="list-group-item list-group-item-action">Profile</NavLink>
                    <NavLink to='/dashboard/user/orders' className="list-group-item list-group-item-action">Order</NavLink>
                    

                </div>
            </div>
        </>
    )
}

export default UserMenu
