import { Company } from "../models/company.model.js";

export const registerCompany = async(req, res) => {
    try {
        const {companyName} = req.body;
        if(!companyName) {
            return res.status(400).json({
                message: "Company Name is required",
                success: false
            })
        }
        let company = await Company.findOne({name: companyName});
        if(company) {
            return res.status(400).json({
                message: "Company already Registered",
                success: false
            });
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//Find company by UserID
export const getCompany = async(req, res) => {
    try {
            const userId = req.id;
            const companies = await Company.find({userId});
            if(!companies) {
                return res.status(404).json({
                    message: "No companies found!",
                    success: false
                });
            }
            return res.status(200).json({
                companies,
                success: true
            })
        
    }catch (error) {
        console.log(error);
    }
}

//Find company by CompanyID
export const getCompanyById = async(req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async(req, res) => {
    try {
        const {name, description, website, location} = req.body;
        console.log(name, description, website, location);
        const file = req.file; //Resume File
        const updatedData = {name, description, website, location};

        const company = await Company.findByIdAndUpdate(req.params.id, updatedData, {new: true});
        if(!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company information updated",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}