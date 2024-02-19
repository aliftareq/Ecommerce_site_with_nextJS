import Layout from '@/components/Layout'
import axios from 'axios';
import { useEffect, useState } from 'react';

const OrdersPage = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        axios.get('/api/orders').then(res => {
            setOrders(res.data)
        })
    }, [])
    return (
        <Layout>
            <h1>Orders</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Paid</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.length && orders.map(order => (
                            <tr>
                                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                                <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                                    {order.paid ? 'Yes' : 'Not yet'}
                                </td>
                                <td>
                                    {order.name},{order.email} <br />
                                    {order.city} {order.postalCode} {order.country} <br />
                                    {order.streetAddress} <br />
                                </td>
                                <td>
                                    {order?.line_items?.map(l => (
                                        <>
                                            {l.price_data.product_data.name} x {l.quantity} <br />
                                        </>
                                    ))}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Layout>
    )
}

export default OrdersPage;