import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


const EditProductpage = () => {
    const [productInfo, setProductInfo] = useState(null)
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id=' + id).then(res => {
            setProductInfo(res.data)
        })
    }, [id])
    return (
        <Layout>
            <h1 className='text-blue-900 text-xl mb-2 font-bold'>Edit Product</h1>
            {
                productInfo && (<ProductForm {...productInfo} />)
            }
        </Layout>
    )
}

export default EditProductpage