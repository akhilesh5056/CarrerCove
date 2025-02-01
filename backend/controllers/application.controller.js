import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "job id is required",
                success: false,
            })
        }
        const isApplicationExist = await Application.findOne({ job: jobId, applicant: userId });
        if (isApplicationExist) {
            return res.status(400).json({
                message: "You have already applied for this job role.",
                success: false,
            })
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "job not found.",
                success: false,
            })
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully.",
            success: true,
        })
    } catch (error) {
        console.log(error);

    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "company",
                    options: { sort: { createdAt: -1 } },
                }
            });
        if (!application) {
            return res.status(404).json({
                message: "No application.",
                success: false,
            })
        }
        return res.status(200).json({
            application,
            success: true,
        })
    } catch (error) {
        console.log(error);

    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const applicant = await Job.findById(jobId)
            .populate({
                path: "applications",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "applicant",
                    options: { sort: { createdAt: -1 } }
                }
            });
        if (!applicant) {
            return res.status(404).json({
                message: "job not found.",
                success: false,
            })
        }
        return res.status(200).json({
            applicant,
            success: true,
        })
    } catch (error) {
        console.log(error);

    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false,
            })
        }
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "application not found.",
                success: false,
            })
        }

        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: "Status updated successfully.",
            success: true,
        })
    }
    catch (error) {
        console.log(error);

    }
}