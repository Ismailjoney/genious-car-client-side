import React, { useEffect, useState } from 'react';

const OrderRowCollections = ({ order, handleDelete }) => {
    const { _id, serviceName, phone, customer, price, service,email, status } = order;
    const [orderService, setOrderService] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/services/${service}`)//service dynamic id er kaj kortece
            .then(res => res.json())
            .then(data => setOrderService(data));
    }, [service])

    
 
    return (
        <tr>
            <th>
                <label>
                    <button onClick={() => handleDelete(_id)} className='btn btn-ghost'>X</button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {
                                orderService?.img && 
                                <img src={orderService.img} alt="Avatar Tailwind CSS Component" />}
                        </div>
                    </div>
                    <div>
                      
                        <div className="font-bold">{serviceName}</div>
                        <div className="font-bold">{price}</div>
                       
                    </div>
                </div>
            </td>
            <td>
            {customer}
                <br />
                <span className="badge badge-ghost badge-sm">${phone}</span>
            </td>
            <td>{email}</td>
            {/* <th>
                <button 
                onClick={() => handleStatusUpdate(_id)}
                className="btn btn-ghost btn-xs">{status ? status : 'pending'}</button>
            </th> */}
        </tr>
    );
};

export default OrderRowCollections;