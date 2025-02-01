import React, { useState } from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query,setQuery]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const searchJobHandler=()=>{
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }
  return (
    <div>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-8">
          <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
            No. 1 Job Nexus
          </span>
          <h1 className="text-5xl font-bold">
            Search, Apply & <br /> Get Your{" "}
            <span className="text-[#6A38C2]">Dream Jobs</span>
          </h1>
          <p>Job Nexus connects job seekers with recruiters, simplifying job searches and streamlining the hiring process.</p>
        </div>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            // value={query}
            placeholder="Find your dream jobs"
            onChange={(e)=>setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button onClick={searchJobHandler} variant="dark" className="rounded-r-full bg-[#6A38C2] text-white px-4 py-2 hover:bg-[#410e9a]">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
  export default HeroSection