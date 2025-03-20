import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

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