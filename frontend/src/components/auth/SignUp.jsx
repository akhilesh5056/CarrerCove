import React, { useState,useEffect } from 'react'
import Navbar from '../shared/Navbar'
import axios from 'axios'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const SignUp = () => {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "",
        profile: "",
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading,user } = useSelector((store) => store.auth)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("fullName", input.fullName)
        formData.append("email", input.email)
        formData.append("password", input.password)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(USER_API_END_POINT + "/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials:true,
            });
            if (res.data.success) {
                navigate("/login");
                setLoading(false);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='flex justify-center items-center mx-auto max-w-5xl'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 '>
                    <h1 className='font-bold text-xl mb-5'>SignUp</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            name="fullName"
                            type="text"
                            value={input.fullName}
                            onChange={changeEventHandler}
                            placeholder="xyz"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            type="email"
                            placeholder="xyz@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            type="password"
                            placeholder=""
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type='text'
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder=""
                        />
                    </div>
                    <div className="flex items-center justify-between gap-4 mt-5">
                        <RadioGroup className="flex items-center gap-4 my-4" >
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer' />
                                <Label htmlFor="r1">Recruiter</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer' />
                                <Label htmlFor="r2">Student</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center  space-x-2">
                            <Label>Profile</Label>
                            <input
                                accept='/image/*'
                                type="file"
                                onChange={changeFileHandler}
                                className='cursor-pointer border border-gray-600 w-full max-w-xs'
                            />
                        </div>
                    </div>
                    {loading ? <Button variant="dark" className="w-full mt-6 mb-2 text-white rounded"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...</Button> : <Button
                        variant="dark"
                        type="submit"
                        className="w-full mt-6 mb-2 text-white rounded">
                        Sign Up
                    </Button>}
                    <span className='text-sm'>Already have an account ?<Link to="/login" className='text-blue-500'> login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default SignUp
