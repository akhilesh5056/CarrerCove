import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job)
    

    return (
        <div>
            <Table>
                <TableCaption>A list of your jobs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead>Job role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> :allAppliedJobs.map((appliedJob,index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{appliedJob?.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{appliedJob?.job?.title}</TableCell>
                            <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                            <TableCell className="text-right"><Badge key={index} variant="dark" className={`${appliedJob?.status==='rejected'? 'bg-red-400':appliedJob.status==='pending'?'bg-gray-400':'bg-green-400'} rounded-full my-1`}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}

export default AppliedJobTable