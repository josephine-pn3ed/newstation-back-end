import { Payload, Id, Email, Password } from '../../model/Employee/types';

const { getEmployees, getEmployeeById, getEmployeeByEmail, insertEmployee, updateEmployee, deleteEmployee } = require('../../model/Employee');
const { getCompanyByEmail } = require('../../model/Company');

module.exports = {
  getEmployees: async () => {
    try {
      const data = await getEmployees("Employees");
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  insertEmployee: async (payload: Payload) => {
    try {
      const { id, employee_email_address } = payload;
      const checkId = await getEmployeeById("Employees", id);
      if (!checkId.length()) {
        return { "message": "Employee ID has already been taken." };
      }
      const checkEmployeeEmail = await getEmployeeByEmail("Employees", employee_email_address);
      if (!checkEmployeeEmail.length()) {
        return { "message": "Email address has already been taken." };
      }
      const checkCompanyEmail = await getCompanyByEmail("Employees", employee_email_address);
      if (Object.keys(checkCompanyEmail)) {
        return { "message": "Email address has already been taken." };
      }
      const data = await insertEmployee("Employees",
        {
          ...payload,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          employee_status: "Active"
        });
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
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