import { Payload, Id, Email, Password } from '../../model/Employee/types';

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
      const { id, employee_email_address } = payload;
      const checkId = await getEmployeeById("Employees", id);
      if (checkId) {
        return { "message": "Employee ID has a lready been taken." };
      }
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