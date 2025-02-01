import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../hooks/useGetCompanyById'



const CompanySetUp = () => {
    const param = useParams()
    const id = param.id
    useGetCompanyById(id)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })


    const { singleCompany } = useSelector(store => store.company)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }
    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: singleCompany.file || null,
            });
        }
    }, [singleCompany])

    const SubmitEventHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.patch(COMPANY_API_END_POINT + "/update" + "/" + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials:true,
            })

            if (res?.data?.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)

        } finally {
            setLoading(false)
        }


    }



    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={SubmitEventHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button
                            onClick={(e) => {
                                e.preventDefault()
                                navigate("/admin/companies/create")
                            }}
                            variant="outline" className="flex item-center  rounded gap-2 text-gray-500 font-semibold">
                            <ArrowLeft /> Back
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="rounded"

                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="rounded"
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="rounded"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="rounded"
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="rounded"
                            />
                        </div>
                    </div>
                    {loading ? <Button variant="dark" className="w-full mt-6 mb-2 text-white rounded"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</Button> : <Button
                        variant="dark"
                        type="submit"
                        className="w-full mt-6 mb-2 text-white rounded">
                        Update
                    </Button>}
                </form>
            </div>
        </div>
    )
}

export default CompanySetUp
