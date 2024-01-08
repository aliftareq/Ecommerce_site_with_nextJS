import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm';


const NewProduct = () => {
    return (
        <Layout>
            <h1 className='text-blue-900 text-xl mb-2 font-bold'>New Product</h1>
            <ProductForm />
        </Layout>
    )
}

export default NewProduct