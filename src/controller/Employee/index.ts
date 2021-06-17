import { Payload, Id, Email, Password } from '../../model/Employee/types';

const Employee = require('../../model/Employee');

module.exports = {
  getEmployee: async (email: Email, password: Password) => {
    try {
      const data = await Employee.getEmployee("Employees", email);
      if (data && (data.employee_password === password)) {
        return true;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  insertEmployee: async (payload: Payload) => {
    try {
      const data = await Employee.insertEmployee("Employees",
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
      const data = await Employee.updateEmployee("Employees", id, {
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
      const data = await Employee.deleteEmployee("Employees", id, {
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