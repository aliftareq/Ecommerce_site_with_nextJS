import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';



const ProductForm = ({
    _id,
    title: extstingTitle,
    description: extstingDescription,
    price: extstingPrice,
    images: existingImages,
    category: assignedCategory,
}) => {
    const [title, setTitle] = useState(extstingTitle || '');
    const [description, setDescription] = useState(extstingDescription || '');
    const [price, setPrice] = useState(extstingPrice || 0);
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false)
    const [goToProducts, setGoToProducts] = useState(false)
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(assignedCategory || '');

    const router = useRouter()

    //functions
    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })
    }, [])
    const saveProduct = async (e) => {
        e.preventDefault()
        const data = {
            title,
            description,
            price,
            images,
            category
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
            setIsUploading(true)
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data)
            setImages(oldImages => {
                return [...oldImages, ...res?.data?.links]
            });
            setIsUploading(false)
        }
    }

    const updateImagesOrder = (images) => {
        setImages(images)
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
            <label>Category</label>
            <select
                onChange={ev => setCategory(ev.target.value)}
                value={category}
            >
                <option value="">Uncategorized</option>
                {categories?.length > 0 && categories?.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            <label>Photos</label>
            <div className='mb-2 flex flex-wrap gap-1'>
                <ReactSortable list={images} setList={updateImagesOrder} className='flex flex-wrap gap-1'>
                    {!!images.length && images.map((link, _id) => (
                        <div key={_id} className='h-24'>
                            <img src={link} alt="" className='rounded-lg' />
                        </div>
                    ))}
                </ReactSortable>
                {
                    isUploading && (
                        <div className='h-24 p-1 flex items-center'>
                            <Spinner />
                        </div>
                    )
                }
                <label className='w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 rounded-md bg-gray-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" onChange={uploadImages} className='hidden' />
                </label>
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