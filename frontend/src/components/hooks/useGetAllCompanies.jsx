import { setAllCompany} from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanies = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchCompanies=async()=>{
            try {
                const res=await axios.get(`${COMPANY_API_END_POINT}/get`,{
                    withCredentials:true,
                })
                
                if(res.data.success){
                    dispatch(setAllCompany(res.data.companies))
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchCompanies();
    },[])
    
}

export default useGetCompanies
