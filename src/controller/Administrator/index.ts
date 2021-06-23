import { Payload, Id } from '../../model/Administrator/types';
import { v4 as uuid_v4 } from 'uuid';

const { getAdministrators, getAdministratorById, getAdministratorByEmail, insertAdministrator, updateAdministrator, updateAdministratorByStatus, deleteAdministrator } = require('../../model/Administrator');
const { getCompanyByEmail } = require('../../model/Company');

module.exports = {
  getAdministrators: async (id: Id) => {
    try {
      const data = await getAdministrators("Users", id, 1);
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  getAdministratorById: async (id: Id) => {
    try {
      const data = await getAdministratorById("Users", id);
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  insertAdministrator: async (payload: Payload) => {
    try {
      const { user_email_address, user_first_name, user_last_name } = payload;
      const empId = uuid_v4();
      const checkEmployeeEmail = await getAdministratorByEmail("Users", user_email_address);
      if (checkEmployeeEmail.length) {
        return { "message": "Email address has already been taken." };
      }
      const checkCompanyEmail = await getCompanyByEmail("Companies", user_email_address);
      if (checkCompanyEmail.length) {
        return { "message": "Email address has already been taken." };
      }
      const data = await insertAdministrator("Users",
        {
          ...payload,
          id: empId,
          role_id: 1,
          user_password: user_first_name.charAt(0).toUpperCase() + user_last_name.charAt(0).toUpperCase() + user_last_name.slice(1) + '@' + empId.slice(0, 5),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_status: "Active"
        });
      if (data) {
        return { "message": "Administrator added successfully!" };
      } else throw Error;
    } catch (error) {
      return error;
    }
  },
  updateAdministrator: async (id: Id, payload: Payload) => {
    try {
      const data = await updateAdministrator("Users", id, {
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
  updateAdministratorByStatus: async (id: Id) => {
    try {
      const data = await updateAdministratorByStatus("Users", id, {
        user_status: "Active",
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
  deleteAdministrator: async (id: Id) => {
    try {
      const data = await deleteAdministrator("Users", id, {
        user_status: "Inactive",
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