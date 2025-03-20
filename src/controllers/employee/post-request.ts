import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

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




  // Get a single employee by ID
// export const getEmployeeById = async (
//     req: Request<EmployeeIDParams>,
//     res: Response
//   ) => {
//     try {
//       const { id } = req.params;
  
//       const employee = await prisma.employee.findUnique({
//         where: { id },
//         include: { permanentAddress: true, currentAddress: true },
//       });
  
//       if (!employee) {
//         res.status(404).json({ message: 'Employee not found' });
//         return;
//       }
  
//       res.status(200).json(employee);
//       return;
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//       return;
//     }
//   };