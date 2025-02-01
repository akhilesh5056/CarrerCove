import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import { Button } from './ui/button'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from './hooks/useGetAppliedJobs'


const skills = ["html", "css", "javascript"]
const isResume = true;
const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 my-5 p-5'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage 
                                src={user?.profile?.profilePhoto} /><input
                                type="file"
                                name="file"
                                />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p >{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} varinat="outline" className="text-right hover:bg-gray-100"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 '>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h2 className='text-base font-semibold'>Skills</h2>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills?.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} variant="dark" className="rounded-full my-1">{item}</Badge>
                            ) : <span>No skills added.</span>
                        }
                    </div>
                </div>
                <div className='grid items-center max-w-sm w-full gap-1'>
                    <Label className="text-base">Resume</Label>
                    {
                        isResume ? <a target="_blank" href={user?.profile?.resume} className='text-blue-500 w-full hover:underline'>{user?.profile?.resumeOriginalName}</a> : <span>resume not added.</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl '>
                <h3 className='font-medium text-lg my-5'>Applied Jobs</h3>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile