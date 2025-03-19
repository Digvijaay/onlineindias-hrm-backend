import { Router, Request, Response } from 'express';
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from '../../controllers/employee/getRequest';

const employeeRoute = Router();

employeeRoute.get('/', getAllEmployees);
employeeRoute.get('/:id', getEmployeeById);
employeeRoute.post('/', createEmployee);
employeeRoute.put('/:id', updateEmployee);
employeeRoute.delete('/:id', deleteEmployee);

export default employeeRoute;
