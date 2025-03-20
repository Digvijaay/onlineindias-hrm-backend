import { Router, Request, Response } from 'express';
import { getEmployeeById, getEmployees } from '../../controllers/employee/get-request';
import { createEmployee } from '../../controllers/employee/post-request';
import { updateEmployee } from '../../controllers/employee/put-request';
import { deleteEmployee } from '../../controllers/employee/delete-request';

const employeeRoute = Router();

employeeRoute.get('/', getEmployees);
employeeRoute.get('/:id', getEmployeeById);
employeeRoute.post('/', createEmployee);
employeeRoute.put('/:id', updateEmployee);
employeeRoute.delete('/:id', deleteEmployee);

export default employeeRoute;
