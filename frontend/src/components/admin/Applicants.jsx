import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantTable from './ApplicantTable'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constants'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import axios from 'axios'
import { motion } from 'framer-motion'

const Applicants = () => {
    const param = useParams()
    const dispatch = useDispatch()
    const { applicants } = useSelector(store => store.application)
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${param.id}/applicants`, {
                    withCredentials: true,
                })
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.applicant))
                }
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
        }
        fetchApplicants()
    }, [])
    return (
        <div>
            <Navbar />
            <motion.div

                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 15,
                }} className='max-w-5xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications.length})</h1>
                <ApplicantTable />
            </motion.div>
        </div>
    )
}

export default Applicants
