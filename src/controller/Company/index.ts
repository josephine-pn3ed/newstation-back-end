import { Payload, Id, Email, Password } from '../../model/Company/types';
import { v4 as uuid_v4 } from 'uuid';

const { getCompany, insertCompany, loginCompany } = require('../../model/Company');

module.exports = {
  getCompany: async (id: Id) => {
    try {
      const data = await getCompany("Companies", id);
      if (data) {
        return true;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  loginCompany: async (payload: Payload) => {
    try {
      const { company_email_address, company_password } = payload;
      const data = await loginCompany("Companies", company_email_address);
      console.log(data[0].company_password, company_password)
      if (data && (data[0].company_password === company_password)) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  insertCompany: async (payload: Payload) => {
    try {
      const data = await insertCompany("Companies",
        {
          ...payload,
          id: uuid_v4(),
          company_status: 'Active',
          created_date: new Date().toISOString(),
          updated_date: new Date().toISOString(),
        });
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  }
}