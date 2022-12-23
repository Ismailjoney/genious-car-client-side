import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';

const Servicescard = ({ service }) => {
    const { _id, img, price, title } = service;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl px-3 py-3 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 border-spacing-4">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className='text-2xl text-orange-600 font-semibold'>Price: ${price}</p>
                <div className="card-actions justify-end">
                    <Link to={`/checkout/${_id}`}>
                        <button className="btn btn-primary">
                            Buy Now
                            <ArrowRightIcon className="h-6 w-6 text-white-500"></ArrowRightIcon>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Servicescard;