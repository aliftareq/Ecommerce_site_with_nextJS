import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const ProductForm = ({
    _id,
    title: extstingTitle,
    description: extstingDescription,
    price: extstingPrice
}) => {
    const [title, setTitle] = useState(extstingTitle || '')
    const [description, setDescription] = useState(extstingDescription || '')
    const [price, setPrice] = useState(extstingPrice || 0)
    const [goToProducts, setGoToProducts] = useState(false)

    const router = useRouter()




    const saveProduct = async (e) => {
        e.preventDefault()
        const data = {
            title,
            description,
            price
        }
        if (_id) {
            //update
            axios.put('/api/products', { ...data, _id })
        }
        else {
            //create
            await axios.post('/api/products', data)
        }
        setGoToProducts(true)
    }

    if (goToProducts) {
        router.push('/products')
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input type="text"
                placeholder='product name'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <textarea
                placeholder='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label>Price</label>
            <input type="number"
                placeholder='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type='submit' className='btn-primary'>Save</button>
        </form>
    )
}

export default ProductForm