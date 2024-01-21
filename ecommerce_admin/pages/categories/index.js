import Layout from '@/components/Layout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withSwal } from 'react-sweetalert2';

const Categories = ({ swal }) => {
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);


    useEffect(() => {
        fetchCategories()
    }, [])
    const fetchCategories = () => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })
    }
    const saveCategory = async (ev) => {
        ev.preventDefault();
        const data = { name, parentCategory }
        if (editCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data)
            setEditedCategory(null)
        } else {
            await axios.post('/api/categories', data)
        }
        setName('')
        fetchCategories()
    }

    const editCategory = (category) => {
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category?.parent?._id)
    }

    const deleteCatagory = (category) => {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if (result.isConfirmed) {
                const { _id } = category;
                await axios.delete('/api/categories?_id=' + _id);
                fetchCategories();
            }
        });
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category: ${editedCategory.name}` : 'Create New Category'}</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input className='mb-0' type="text" placeholder='Category Name' value={name} onChange={(ev) => setName(ev.target.value)} />
                <select
                    className='mb-0'
                    value={parentCategory}
                    onChange={(ev) => setParentCategory(ev.target.value)}
                >
                    <option value="">No Parent Category</option>
                    {categories?.length > 0 &&
                        categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))
                    }
                </select>
                <button type='submit' className='btn-primary'>Save</button>
            </form>
            <table className='basic mt-4'>
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>Parent Category</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {categories?.length > 0 &&
                        categories.map((category, idx) => (
                            <tr key={idx}>
                                <td>{category?.name}</td>
                                <td>{category?.parent?.name}</td>
                                <td className='flex gap-2'>
                                    <button
                                        onClick={() => editCategory(category)}
                                        className='btn-primary'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCatagory(category)}
                                        className='btn-primary'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Layout>
    )
}


export default withSwal(({ swal }, ref) => (
    <Categories swal={swal} />
))