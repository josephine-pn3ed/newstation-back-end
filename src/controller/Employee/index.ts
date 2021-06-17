import { Payload, Id, Email, Password } from '../../model/Employee/types';

const { getEmployees, insertEmployee, updateEmployee, deleteEmployee } = require('../../model/Employee');

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