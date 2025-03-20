import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


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
  