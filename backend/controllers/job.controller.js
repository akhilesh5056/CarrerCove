import { Job } from "../models/job.model.js";

export const postJobs = async (req, res) => {
    try {
        const userId = req.id;
        const { title, description, requirements, location, salary, experienceLevel, jobType, position, company } = req.body;
        
        if (!title || !description || !requirements || !location || !salary || !experienceLevel || !jobType || !position || !company) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false,
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            location,
            salary:Number(salary),
            experienceLevel,
            jobType,
            position,
            company,
            created_by: userId,
        })
        return res.status(201).json({
            message: "New Job posted successfully.",
            job,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }
        const job = await Job.find(query).populate('company').sort({ createdAt: -1 });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false,
            })
        }
        return res.status(200).json({
            job,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({path:"applications"});
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false,
            })
        }
        return res.status(200).json({
            job,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({path:'company'});
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false,
            })
        }
        return res.status(200).json({
            jobs,
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}