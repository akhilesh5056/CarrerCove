import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const Login = () => {
    
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { loading ,user} = useSelector((store) => store.auth)


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true));
            const res = await axios.post(USER_API_END_POINT + "/login", input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials:true,
            });
            
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/")
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='flex justify-center items-center mx-auto max-w-5xl'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 '>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            type="email"
                            placeholder="xyz@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder=""
                        />
                    </div>
                    <div className="flex items-center justify-between mt-5">
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
                    </div>
                    {loading ? <Button variant="dark" className="w-full mt-6 mb-2 text-white rounded"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...</Button> : <Button
                        variant="dark"
                        type="submit"
                        className="w-full mt-6 mb-2 text-white rounded">
                        Login
                    </Button>}
                    <span className='text-sm'>Don't have an account ?<Link to="/signUp" className='text-blue-500'> signUp</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login
