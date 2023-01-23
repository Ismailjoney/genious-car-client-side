import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthorContext } from '../../Context/AuthContext';
 


const SingUp = () => {

    const {createUser} = useContext(AuthorContext)
    const navigate = useNavigate();

    const handleSingUp = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email,password)
        .then(resualt =>{
            const user = resualt.user;
            navigate('/')
            console.log(user)
        })
        .catch(error =>{
            console.error(error)
        })
    }

    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                    <h1 className="text-5xl text-center font-bold">SingUp</h1>
                    <form onSubmit={handleSingUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Your Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                             
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Singup" />
                        </div>
                    </form>
                    <p className='text-center'>All ready have an account<Link className='text-orange-600 font-bold' to="/login"> Login</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default SingUp;