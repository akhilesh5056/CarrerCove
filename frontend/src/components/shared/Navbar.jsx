import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'



const Navbar = () => {
    const { user } = useSelector((store) => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        try {
            const res = await axios.post(USER_API_END_POINT + "/logout", "",{
                withCredentials:true,
            })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
        }

    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-5xl h-16'>
                <div>
                    <h3 onClick={()=>navigate("/")} className='text-2xl font-bold cursor-pointer'>Job <span className='text-[#F83002]'>Nexus</span></h3>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? <><li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li></> :
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login"><Button className="rounded" variant="outline">Login</Button></Link>
                                <Link to="/signUp"><Button className="text-white rounded bg-[#6A38C2] hover:bg-[#451192]">SignUp</Button></Link>
                            </div>
                        ) : (<Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-white">
                                <div className='flex items-center gap-2 '>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto || "https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg"} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullName}</h4>
                                        <p className='text-sm text-muted-foreground text-slate-900'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col my-2 text-gray-600'>
                                    {
                                        user && user.role === 'student' &&
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                        </div>
                                    }
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut />
                                        <Button onClick={logoutHandler} variant="link"><Link to="/logout">Logout</Link></Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
