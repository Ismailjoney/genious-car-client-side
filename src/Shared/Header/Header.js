import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import { AuthorContext } from '../../Context/AuthContext';


const Header = () => {
    const {user, logout} = useContext(AuthorContext)

    const handdleLogOut = () => {
        logout()
        .then(res =>res.json())
        .catch(err => console.log(err))
    }

    const menubar = <>
        <li className='font-semibold'><Link to='/'>Home</Link></li>
        {
            (user?.email) ?
            <>
            <li className='font-semibold'><Link to='/orders'>My Orders</Link></li>
            <button className='btn goast' onClick={handdleLogOut}>Log Out</button>
            </>
            :
            <>
            <li className='font-semibold'><Link to='/login'>Login</Link></li>
            <li className='font-semibold'><Link to='/singup'>Singup</Link></li>
            </>
        }
    </>

    return (
        <div className="navbar bg-base-100 h-20 mb-12 pt-12">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>

                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menubar}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">
                    <img src={logo} alt="" />
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menubar}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-outline btn-accent">Button</button>
            </div>
        </div>
    );
};

export default Header;