import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetCompanies from '../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { motion } from 'framer-motion'

const Companies = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useGetCompanies()

    const [input, setInput] = useState("")
    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input])
    return (
        <div>
            <Navbar />
            <div className='max-w-5xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <Input
                        className="w-fit rounded text-muted-foreground"
                        placeholder="filter By name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => { navigate("/admin/companies/create") }}
                        variant="dark" className="rounded">New Company</Button>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 70,
                        damping: 15,
                    }}>
                    <CompaniesTable />
                </motion.div>

            </div>
        </div>
    )
}

export default Companies