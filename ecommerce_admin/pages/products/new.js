import Layout from '@/components/Layout'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


const NewProduct = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [goToProducts, setGoToProducts] = useState(false)

    const router = useRouter()

    const data = {
        title,
        description,
        price
    }


    const createProduct = async (e) => {
        e.preventDefault()
        await axios.post('/api/products', data)
        setGoToProducts(true)
    }

    if (goToProducts) {
        router.push('/products')
    }

    return (
        <Layout>
            <form onSubmit={createProduct}>
                <h1 className='text-blue-900 text-xl mb-2 font-bold'>New Product</h1>
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
        </Layout>
    )
}

export default NewProduct