import { setAllAdminJobs } from '@/redux/jobSlice'
import { USER_JOB_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await axios.get(USER_JOB_END_POINT + "/getjobByadmin",{
                    withCredentials:true,
                })

                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchAdminJobs();
    }, [])

}

export default useGetAdminJobs
