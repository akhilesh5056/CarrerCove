import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import useGetAllJobs from './hooks/useGetAllJobs'
import { motion } from 'framer-motion'



const Browse = () => {
    useGetAllJobs()
    const { allJobs } = useSelector(store => store.job)
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""));
        }
    }, [])
    return (
        <div >
            <Navbar />
            <div className='max-w-5xl mx-auto my-8'>
                <h1 className='font-bold text-xl my-8'>Search Result({allJobs.length})</h1>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 70,
                        damping: 15,
                    }}
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                    className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.length <= 0 ? <span>No Job available.</span> : allJobs.map((job, index) => {
                            return (
                                <Job key={job._id || index} job={job} />
                            )
                        })
                    }
                </motion.div>
            </div>
        </div>
    )
}

export default Browse