import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'



const Jobs = () => {
    const { allJobs, searchQuery } = useSelector(store => store.job)
    const [filteredJobs, setFilteredJobs] = useState(allJobs)
    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchQuery.toLowerCase())
            })
            setFilteredJobs(filteredJobs)
        }
        else {
            setFilteredJobs(allJobs)
            
        }
    }, [searchQuery])
    return (
        <div>
            <Navbar />
            <div className='max-w-5xl mx-auto mt-8'>
                <div className='flex gap-6'>
                    <div className='w-[10%]'>
                        <FilterCard />
                    </div>
                    {
                        filteredJobs.length <= 0 ? <span>No Jobs available.</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filteredJobs.map((job, index) =>
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 70,
                                                    damping: 15,
                                                }}
                                                exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}

                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div >
                                        )
                                    }

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Jobs