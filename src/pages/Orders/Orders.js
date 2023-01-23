import React, { useContext, useEffect, useState } from 'react';
import { AuthorContext } from '../../Context/AuthContext';
import OrderRowCollections from './OrderRowCollections';

const Orders = () => {
    const { user, logout} = useContext(AuthorContext);
    const [orders, setOrders] = useState([])

    //get specific data from specific user:
    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            //after log in page jwt work : get token local storage and send server
            headers : {
                authorization : `Bearer ${localStorage.getItem(`genius-token`)}`
             }
        })
        .then(res =>  {
            if(res.status === 401 || res.status === 403){
                return logout()
            }
            return res.json()
        })
            .then(data => {
                console.log( data);
                setOrders(data)
            })
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

        const handdleUpdate = id => {
            fetch(`http://localhost:5000/orders/${id}`,{
               method: "PATCH",
               headers: {
                    'content-type': 'application/json' 
               },
               body: JSON.stringify({status: 'Approved'})
           })
           .then(res => res.json())
           .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                // step-1: ami j id dicci sei id ta bad diye baki gula k nilam(remaining )
                // step-2: ami jei id ta dicci seitar sathe onno onno id er sathe match koralam(approving)
                // step-3: status change koralam(approving.status = 'approve')
                // syep-4: bad dewa id cara ja cilo segula k copy korlm abong amr dewa id ta add kore set order a set korlam(const newOrders = [approving,...remaining])
              

                const remaining = orders.filter(odr => odr._id !== id)
                const approving = orders.find(odr => odr._id === id)
                approving.status = 'approve'

                const newOrders = [approving,...remaining]
                setOrders(newOrders)
            }
           })
           .then(err => console.log(err))
        }
    

    return (
        <div>
            <h2 className="text-5xl">You have {orders.length ? orders.length : 0} Orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Service Name and price</th>
                            <th>Customer name</th>
                            <th>Customer email</th>
                            <th>Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRowCollections
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handdleUpdate={handdleUpdate}
                            ></OrderRowCollections>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;