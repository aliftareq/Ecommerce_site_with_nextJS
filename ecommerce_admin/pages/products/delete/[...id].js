import Layout from '@/components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const DeleteProductPage = () => {
    const router = useRouter()
    const [productInfo, setproductInfo] = useState({})
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/api/products?id=' + id).then(res => {
            setproductInfo(res.data)
        })

    }, [id])

    //functions
    const deleteProduct = async () => {
        await axios.delete('/api/products?id=' + id);
        goBack()
    }

    const goBack = () => {
        router.push('/products')
    }
    return (
        <Layout>
            <h1 className='text-center'>Do you really want to delete "{productInfo?.title}"?</h1>
            <div className='flex gap-2 justify-center'>
                <button
                    className='btn-red'
                    onClick={deleteProduct}>
                    Yes
                </button>
                <button
                    className='btn-default'
                    onClick={goBack}>
                    No
                </button>
            </div>

        </Layout>

    )
}

export default DeleteProductPage