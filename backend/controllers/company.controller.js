import { get } from "mongoose";
import { Company } from "../models/company.model.js";
import { User } from "../models/user.models.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);

        if (user && user.role === 'student') {
            return res.status(400).json({
                message: "Students are not allowed to create jobs.",
                success: false,
            })
        }

        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false,
            })
        }
        const isCompanyExist = await Company.findOne({ name: companyName });
        if (isCompanyExist) {
            return res.status(400).json({
                message: "You can't registered same company.",
                success: false,
            })
        }
        const company = await Company.create({
            name: companyName,
            userId: req.id,
        })
        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true,
        })

    } catch (error) {
        console.log(error);

    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(400).json({
                message: "",
                companies,
                success: true,
            })
        }
        return res.status(200).json({
            message: "All companies",
            companies,
            success: true,
        })

    } catch (error) {
        console.log(error)
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(400).json({
                message: "Company not found.",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Company",
            company,
            success: true,
        })
    } catch (error) {
        console.log(error);

    }
}

export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const { name, description, website, location } = req.body;
        

        const file = req.file;
        if (file) {
            const fileUri = getDataUri(file)
            var cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        }
        if (cloudResponse) {
            var logo = cloudResponse.secure_url
        }
        const updateData = { name, description, website, location, logo };
        const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true })
        if (!company) {
            return res.status(400).json({
                message: "Company not found.",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Company information updated.",
            company,
            success: true,
        })

    } catch (error) {
        console.log(error);

    }
}
