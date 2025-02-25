import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constants'
import axios from 'axios'


const sortListingStatus = ["Accepted", "Rejected"]
const ApplicantTable = () => {
    const { applicants } = useSelector(store => store.application)

    const submitHandler=async(status,id)=>{
        
        
try {
   
    const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
        withCredentials:true,
    })

    
} catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
}
    }
    return (

        <div>
            <Table>
                <TableCaption>A list of your applicants.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((app) => (
                            <tr>
                                <TableCell className="font-medium">{app?.applicant?.fullName}</TableCell>
                                <TableCell>{app?.applicant?.email}</TableCell>
                                <TableCell>{app?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {app?.applicant? <a className='text-blue-600' target='_blank' href={app?.applicant?.profile?.resume}>{app?.applicant?.profile?.resumeOriginalName}</a>:NA}
                                </TableCell>
                                <TableCell>{app?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white">
                                            {
                                                sortListingStatus.map((status, index) => {
                                                    return (
                                                        <div key={app?._id}>
                                                            <span 
                                                            onClick={()=>submitHandler(status,app?._id)}
                                                            className='cursor-pointer'>{status}</span>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantTable
