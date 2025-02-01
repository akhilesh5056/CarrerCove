import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';




const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)

    return (
        <div className="max-w-5xl mx-auto my-20">

            <h1 className="text-4xl font-bold mx-auto">
                <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
            </h1>


            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 15,
                }}
                className="grid grid-cols-3 gap-4 my-5">
                {allJobs.length <= 0 ? <span>No job available.</span> : allJobs.slice(0, 6).map((job, index) => (
                    <LatestJobCards key={index} job={job} />
                ))}
            </motion.div>
        </div>
    );
};

export default LatestJobs;
