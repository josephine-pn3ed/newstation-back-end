import { Payload, Id, Email, Password } from '../../model/Employee/types';
import { v4 as uuid_v4 } from 'uuid';

const { getEmployees, getEmployeeById, getEmployeeByEmail, insertEmployee, updateEmployee, updateEmployeeByStatus, deleteEmployee } = require('../../model/Employee');
const { getCompanyByEmail } = require('../../model/Company');

module.exports = {
  getEmployees: async (id: Id) => {
    try {
      const data = await getEmployees("Employees", id);
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  getEmployeeById: async (id: Id) => {
    try {
      const data = await getEmployeeById("Employees", id);
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  insertEmployee: async (payload: Payload) => {
    try {
      const { employee_email_address, employee_first_name, employee_last_name } = payload;
      const empId = uuid_v4();
      const checkEmployeeEmail = await getEmployeeByEmail("Employees", employee_email_address);
      if (checkEmployeeEmail.length) {
        return { "message": "Email address has already been taken." };
      }
      const checkCompanyEmail = await getCompanyByEmail("Companies", employee_email_address);
      if (checkCompanyEmail.length) {
        return { "message": "sdfdEmail address has already been taken." };
      }
      const data = await insertEmployee("Employees",
        {
          ...payload,
          id: empId,
          employee_password: employee_first_name.charAt(0).toUpperCase() + employee_last_name.charAt(0).toUpperCase() + employee_last_name.slice(1) + '@' + empId.slice(0, 5),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          employee_status: "Active"
        });
      if (data) {
        return { "message": "Employee added successfully!" };
      } else throw Error;
    } catch (error) {
      return error;
    }
  },
  updateEmployee: async (id: Id, payload: Payload) => {
    try {
      const data = await updateEmployee("Employees", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    }
    catch (error) {
      return false;
    }
  },
  updateEmployeeByStatus: async (id: Id) => {
    try {
      const data = await updateEmployeeByStatus("Employees", id, {
        employee_status: "Active",
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    }
    catch (error) {
      return false;
    }
  },
  deleteEmployee: async (id: Id) => {
    try {
      const data = await deleteEmployee("Employees", id, {
        employee_status: "Inactive",
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    }
    catch (error) {
      return false;
    }
  },
}