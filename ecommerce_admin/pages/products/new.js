import Layout from '@/components/Layout'
import React from 'react'

const NewProduct = () => {
    return (
        <Layout>
            <h1 className='text-blue-900 text-xl mb-2 font-bold'>New Product</h1>
            <label>Product Name</label>
            <input type="text" placeholder='product name' />
            <label>Description</label>
            <textarea placeholder='description'></textarea>
            <label>Price</label>
            <input type="number" placeholder='price' />
            <button className='btn-primary'>Save</button>
        </Layout>
    )
}

export default NewProduct