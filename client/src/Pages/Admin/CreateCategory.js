import React, { useEffect, useState } from 'react'
import AppLayout from '../../Compo/AppLayout/AppLayout'
import AdminMenu from '../../Compo/AppLayout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Modal } from 'antd'
import CategoryFrom from '../../Compo/Form/CategoryFrom'
const CreateCategory = () => {
    const [categories, setCategories] = useState([])

    const [name, setName] = useState('')
    const [visible, setVisisble] = useState(false);
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name })
            if (data.success) {
                toast.success(`${name} is created`)
                getAllCategory();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Somthing went wrong")
        }
    }

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setCategories(data?.category)
            }

        } catch (error) {
            console.log(error)
            toast.error("Somthing went Wrong")
        }
    }
    useEffect(() => {
        getAllCategory()
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {

                toast.success(`${updatedName} is Update`)
                setSelected(null)
                setUpdatedName("")
                getAllCategory();
                setVisisble(false)


            } else {
                toast.error(data.message)

            }
        } catch (error) {
            toast.error("Somthing Went Wrong")
        }

    }

    const handleDelete = async (pId) => {

        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pId}`)
            if (data.success) {

                toast.success('category is Delete')
                getAllCategory();



            } else {
                toast.error(data.message)

            }
        } catch (error) {
            toast.error("Somthing Went Wrong")
        }

    }





    return (
        <AppLayout title={"Dsahboard - Create Category"}>
            <div NclassNameName='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>

                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='p-3'>
                            <CategoryFrom handleSubmit={handleSubmit} value={name}

                                setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {categories?.map((c) => (
                                        <><tr>
                                            <td key={c._id}>{c.name}</td>
                                            <td>
                                                <button
                                                    className='btn btn-primary'
                                                    onClick={() => { setVisisble(true); setUpdatedName(c.name); setSelected(c) }}

                                                >Edit</button>
                                                <button
                                                    onClick={(id) => { handleDelete(c._id) }}
                                                    className='btn btn-danger'>Delete</button>

                                            </td>
                                        </tr>
                                        </>
                                    ))}


                                </tbody>
                            </table>

                        </div>
                        <Modal onCancel={() => setVisisble(false)} footer={null}
                            visible={visible}>
                            <CategoryFrom

                                value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>

                    </div>
                </div>

            </div>
        </AppLayout>
    )
}

export default CreateCategory
