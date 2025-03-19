import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface EmployeeIDParams {
  id?: string; // Or number, depending on your ID type
}
// Get all employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      include: { permanentAddress: true, currentAddress: true },
    });
    res.status(200).json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single employee by ID
export const getEmployeeById = async (
  req: Request<EmployeeIDParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { permanentAddress: true, currentAddress: true },
    });

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    res.status(200).json(employee);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

// Create a new employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      guardianName,
      personalEmail,
      personalPhone,
      aadharCard,
      panCard,
      permanentAddress,
      currentAddress,
    } = req.body;

    const newEmployee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        gender,
        guardianName,
        personalEmail,
        personalPhone,
        aadharCard,
        panCard,
        permanentAddress: { create: permanentAddress },
        currentAddress: { create: currentAddress },
      },
      include: { permanentAddress: true, currentAddress: true },
    });

    res.status(201).json(newEmployee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update an employee
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      gender,
      personalEmail,
      personalPhone,
      aadharCard,
      panCard,
      permanentAddress,
      currentAddress,
    } = req.body;

    // Update Employee Details
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        firstName,
        lastName,
        gender,
        personalEmail,
        personalPhone,
        aadharCard,
        panCard,

        // Update Permanent Address
        permanentAddress: {
          upsert: {
            create: {
              hNo: permanentAddress?.hNo,
              city: permanentAddress?.city,
              pincode: permanentAddress?.pincode,
              state: permanentAddress?.state,
              country: permanentAddress?.country,
            },
            update: {
              hNo: permanentAddress?.hNo,
              city: permanentAddress?.city,
              pincode: permanentAddress?.pincode,
              state: permanentAddress?.state,
              country: permanentAddress?.country,
            },
          },
        },

        // Update Current Address
        currentAddress: {
          upsert: {
            create: {
              hNo: currentAddress?.hNo,
              city: currentAddress?.city,
              pincode: currentAddress?.pincode,
              state: currentAddress?.state,
              country: currentAddress?.country,
            },
            update: {
              hNo: currentAddress?.hNo,
              city: currentAddress?.city,
              pincode: currentAddress?.pincode,
              state: currentAddress?.state,
              country: currentAddress?.country,
            },
          },
        },
      },
    });

    res.status(200).json(updatedEmployee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({ where: { id } });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
