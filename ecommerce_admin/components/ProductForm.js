import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'



const ProductForm = ({
    _id,
    title: extstingTitle,
    description: extstingDescription,
    price: extstingPrice,
    images
}) => {
    const [title, setTitle] = useState(extstingTitle || '')
    const [description, setDescription] = useState(extstingDescription || '')
    const [price, setPrice] = useState(extstingPrice || 0)
    const [goToProducts, setGoToProducts] = useState(false)

    const router = useRouter()

    //functions
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

    const uploadImages = async (ev) => {
        const files = ev.target.files;
        if (files.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data)
            console.log(res.data)
        }
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
            <label>Photos</label>
            <div className='mb-2'>
                <label className='w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 rounded-md bg-gray-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" onChange={uploadImages} className='hidden' />
                </label>
                {!images?.length && (
                    <div>No Photos in this Product</div>
                )}
            </div>
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