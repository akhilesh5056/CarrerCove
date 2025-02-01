import { setAllJobs } from '@/redux/jobSlice'
import { USER_JOB_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const { searchQuery } = useSelector(store => store.job)
    console.log(searchQuery)
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {

                
                const res = await axios.get(`${USER_JOB_END_POINT}/get?keyword=${searchQuery}`,{
                    withCredentials:true,
                })
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.job))
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllJobs();
    }, [searchQuery])

}

export default useGetAllJobs
