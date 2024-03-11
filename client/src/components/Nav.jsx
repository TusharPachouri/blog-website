// import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <ul className='nav-ul'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About Us</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li>
                {/* <li>
                    <Link to='/logout'>Logout</Link>
                </li> */}
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/signup'>Sign Up</Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav;