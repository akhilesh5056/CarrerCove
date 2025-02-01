import React, { useEffect, useMemo, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT, USER_JOB_END_POINT } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {
    const param = useParams()
    const jobId = param.id;


    const dispatch = useDispatch()
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isApplied = useMemo(() => {
        return singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
    }, [singleJob, user?._id]);


  
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(APPLICATION_API_END_POINT + "/apply" + "/" + jobId,{
                withCredentials:true,
            })


            if (res.data.success) {
                const updateSingleJobs = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJobs))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)

        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(USER_JOB_END_POINT + "/get" + "/" + jobId, {
                    withCredentials: true,
                })

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchSingleJob();
    }, [jobId, user?._id, dispatch])


    return (
        <div
            className="max-w-5xl mx-auto my-10">
            <div
                className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl text-transform: capitalize">{singleJob?.title}</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge className="text-blue-700 font-bold" variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className="text-[#7209b7] font-bold" variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-[#F83062] font-bold" variant="ghost">
                            {singleJob?.salary}LPA
                        </Badge>
                    </div>
                </div>

                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded px-2 py-1 ${isApplied
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'text-white bg-[#7209b7] hover:bg-[#5e059d]'
                        }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <div className="border-b-2 border-b-gray-300 font-medium py-4 mt-6">
                Job Description
            </div>
            <div className="my-4">
                <h1 className="font-bold my-1">
                    Role:
                    <span className="pl-4 font-normal text-gray-800 text-transform: capitalize">{singleJob?.title}</span>
                </h1>
                <h1 className="font-bold my-1">
                    Location:
                    <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
                </h1>
                <h1 className="font-bold my-1">
                    Experience:
                    <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel}+ yrs</span>
                </h1>
                <h1 className="font-bold my-1">
                    Description:
                    <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span>
                </h1>
                <h1 className="font-bold my-1">
                    Salary:
                    <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
                </h1>
                <h1 className="font-bold my-1">
                    Total Applicants:
                    <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span>
                </h1>
                <h1 className="font-bold my-1">
                    Posted Date:
                    <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span>
                </h1>
            </div>
        </div>
    );
};

export default JobDescription;
