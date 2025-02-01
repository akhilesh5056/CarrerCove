import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobTable from './AdminJobTable'
import useGetAdminJobs from '../hooks/useGetAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { motion } from 'framer-motion'

const AdminJobs = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useGetAdminJobs()

    const [input, setInput] = useState("")
    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])
    return (
        <div>
            <Navbar />
            <div className='max-w-5xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <Input
                        className="w-fit rounded text-gray-500"
                        placeholder="filter By name, role"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        variant="dark" className="rounded">New Job</Button>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 70,
                        damping: 15,
                    }}>
                    <AdminJobTable />
                </motion.div>

            </div>
        </div>
    )
}

export default AdminJobs