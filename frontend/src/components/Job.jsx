import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunctions = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border-gray-100 h-full flex flex-col justify-between'>
            <div>
                <div className='flex justify-between items-center'>
                    <p className='text-sm text-gray-500'>
                        {daysAgoFunctions(job?.createdAt) === 0 ? "Today" : `${daysAgoFunctions(job?.createdAt)} days ago`}
                    </p>
                    <Button variant="outline" className="rounded-full" size="icon">
                        <Bookmark />
                    </Button>
                </div>
                <div className='flex items-center gap-2 my-2'>
                    <Button className='p-6 rounded-full' variant="outline" size="icon">
                        <Avatar>
                            <AvatarImage src={job?.company?.logo || "https://www.shutterstock.com/shutterstock/photos/2174926871/display_1500/stock-vector-circle-line-simple-design-logo-blue-format-jpg-png-eps-2174926871.jpg"} />
                        </Avatar>
                    </Button>
                    <div>
                        <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
                        <p className='text-sm text-gray-500'>{job?.location}</p>
                    </div>
                </div>
                <div>
                    <h1 className='text-lg font-medium my-2 capitalize'>{job?.title}</h1>
                    <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                    <Badge className="text-blue-700 font-bold" variant="ghost">
                        {job?.position} Positions
                    </Badge>
                    <Badge className="text-[#F83002] font-bold" variant="ghost">
                        {job?.jobType}
                    </Badge>
                    <Badge className="text-[#7209b7] font-bold" variant="ghost">
                        {job?.salary} LPA
                    </Badge>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 15,
                }}
                className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job._id}`)} className="rounded hover:bg-slate-200" variant="outline">
                    Details
                </Button>
                <Button className="rounded bg-[#7209b7] text-white hover:bg-[#5a0d8e] hover:text-white" variant="outline">
                    Save For Later
                </Button>
            </motion.div>
        </div>
    );
};

export default Job;