import React, { useContext, useEffect, useState } from 'react';
import { AuthorContext } from '../../Context/AuthContext';
import OrderRowCollections from './OrderRowCollections';

const Orders = () => {
    const { user } = useContext(AuthorContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user?.email])


    const handleDelete =(id) => {
        const agree = window.confirm("Are you agree to delete this Order");
        if(agree){
           fetch(`http://localhost:5000/orders/${id}`,{
               method: "DELETE"
           })
           .then(res=>res.json())
           .then(data=> {
               if(data.deletedCount > 0){
                     const remaining = orders.filter(odr => odr._id !== id )
                    setOrders(remaining)
                     

               }
               console.log(data)
           })
       }
        }
    

    return (
        <div>
            <h2 className="text-5xl">You have {orders.length} Orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Service Name and price</th>
                            <th>Customer name</th>
                            <th>Customer email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRowCollections
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                            ></OrderRowCollections>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;