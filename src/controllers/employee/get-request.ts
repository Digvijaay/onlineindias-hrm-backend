import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface EmployeeIDParams {
  id?: string; // Or number, depending on your ID type
}
// Get all employees
export const getEmployees = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      page = 1,
      limit = 10,
      salary,
      bankDetails,
      companyInfo,
      previousCompany,
      documents,
      permanentAddress,
      currentAddress,
    } = req.query;

    // Build include object based on query params
    const include = {
      bankDetails: bankDetails === "true",
      companyInfo: companyInfo === "true",
      previousCompany: previousCompany === "true",
      documents: documents === "true",
      permanentAddress: permanentAddress === "true",
      currentAddress: currentAddress === "true",
    };

    // For multiple employees
    const parsedLimit = parseInt(limit as string);
    const parsedPage = parseInt(page as string);

    // If limit is 0 or not set, fetch all employees
    if (parsedLimit === 0) {
      const employees = await prisma.employee.findMany({
        include,
      });
      res.json(employees);
      return;
    }

    // Fetch paginated employees
    const employees = await prisma.employee.findMany({
      skip: (parsedPage - 1) * parsedLimit,
      take: parsedLimit,
      include,
    });

    // Get total count for pagination
    const total = await prisma.employee.count();

    res.json({
      data: employees,
      pagination: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
    return;
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

// Get a single employee by ID
export const getEmployeeById = async (
  req: Request<EmployeeIDParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      salary,
      bankDetails,
      companyInfo,
      previousCompany,
      documents,
      permanentAddress,
      currentAddress,
    } = req.query;

    // Build include object based on query params
    const include = {
      bankDetails: bankDetails === "true",
      companyInfo: companyInfo === "true",
      previousCompany: previousCompany === "true",
      documents: documents === "true",
      permanentAddress: permanentAddress === "true",
      currentAddress: currentAddress === "true",
    };
    const employee = await prisma.employee.findUnique({
      where: { id },
      include,
    });

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json(employee);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
