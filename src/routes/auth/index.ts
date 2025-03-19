import { Router } from 'express';
import employeeRoute from './employee';

const authRoute = Router();

authRoute.use('/employee', employeeRoute);

export default authRoute;
