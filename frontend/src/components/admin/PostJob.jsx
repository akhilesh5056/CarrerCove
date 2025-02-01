import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { USER_JOB_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: "",
        company: ""

    })
    const navigate = useNavigate()
    const { allCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(USER_JOB_END_POINT + "/post", input, {
                headers: {
                    'Content-type': 'application/json'
                },
                withCredentials:true,
            })


            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/jobs")

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)

        } finally {
            setLoading(false)
        }

    }
    const selectEventHandler = (value) => {
        const selectedCompany = allCompany.find((company) => company?.name?.toLowerCase() === value)
        setInput({ ...input, company: selectedCompany ? selectedCompany._id : "" })
    }
    return (
        <div>
            <Navbar />
            <h1 className='flex justify-center items-center mx-auto font-bold text-3xl my-5'> Post Jobs</h1>
            <div className='flex justify-center items-center w-screen my-5'>

                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 rounded-md shadow-lg'>

                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                className="rounded"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                className="rounded"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                className="rounded"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                className="rounded"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                className="rounded"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                className="rounded"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <Input
                                type="text"
                                className="rounded"
                                name="experienceLevel"
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input
                                type="number"
                                className="rounded"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            {
                                allCompany.length > 0 && (

                                    <Select onValueChange={selectEventHandler}>
                                        <SelectTrigger className="w-[188px] rounded ">
                                            <SelectValue placeholder="Select a Company" className='bg-white' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup className="bg-white">
                                                {
                                                    allCompany.map((company) => {
                                                        return (
                                                            <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                        )
                                                    })
                                                }

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )
                            }
                        </div>
                    </div>
                    {loading ? <Button variant="dark" className="w-full mt-6 mb-2 text-white rounded"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...</Button> : <Button
                        variant="dark"
                        type="submit"
                        className="w-full mt-6 mb-2 text-white rounded">
                        Register
                    </Button>}
                    {
                        allCompany.length === 0 && <p className='text-sm text-red-600 text-center font-bold mt-2'>*Please register a company first, before postin a job.</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob
