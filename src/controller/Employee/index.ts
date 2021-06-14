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
          created_date: new Date().toISOString(),
          updated_date: new Date().toISOString(),
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
      const data = await Employee.updateEmployee("Employees", {
        ...payload,
        updated_date: new Date().toISOString(),
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
        status: "Inactive",
        updated_date: new Date().toISOString(),
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