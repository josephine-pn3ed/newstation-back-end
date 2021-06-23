import { Payload, Id, Email, Password } from '../../model/Company/types';
import { v4 as uuid_v4 } from 'uuid';
const { getCompany, insertCompany, getCompanyByEmail, deleteCompany, updateCompany } = require('../../model/Company');
const { getEmployeeByEmail } = require('../../model/Employee');

module.exports = {
  getCompany: async (id: Id) => {
    try {
      const data = await getCompany("Companies", id);
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  login: async (payload: Payload) => {
    try {
      const { email_address, password } = payload;
      try {
        const checkCompany = await getCompanyByEmail("Companies", email_address);
        if (checkCompany) {
          if (checkCompany[0].company_password === password) {
            return { "message": checkCompany[0].id, "user": "company", "email": checkCompany[0].company_email_address };
          } else return { "message": "Wrong password." }
        }
      } catch (error) {
        const checkEmployee = await getEmployeeByEmail("Employees", email_address);
        if (checkEmployee) {
          if (checkEmployee[0].employee_password === password) {
            return { "message": checkEmployee[0].company_id, "user": "employee", "email": checkEmployee[0].employee_email_address, "id": checkEmployee[0].id };
          } else return { "message": "Wrong password." }
        } else throw Error;}
    } catch (error) {
      return { "message": "Invalid credentials!" };
    }
  },
  insertCompany: async (payload: Payload) => {
    try {
      const { company_email_address } = payload;
      const checkEmail = await getCompanyByEmail("Companies", company_email_address);
      if (!checkEmail.length) {
        const data = await insertCompany("Companies",
          {
            ...payload,
            id: uuid_v4(),
            company_status: 'Active',
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString(),
          });
        if (data) {
          return { "message": data };
        } else throw Error;
      } else return { "message": "Email address has already been taken." };
    } catch (error) {
      return false;
    }
  },
  updateCompany: async (id: Id, payload: Payload) => {
    try {
      const data = await updateCompany("Companies", id, {
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
  deleteCompany: async (id: Id) => {
    try {
      const data = await deleteCompany("Companies", id, {
        company_status: "Inactive",
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    }
    catch (error) {
      return false;
    }
  }
}