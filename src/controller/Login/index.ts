import { Payload } from "../../model/Company/types";
const { getCompanyByEmail } = require("../../model/Company");
const { getEmployeeByEmailAndStatus } = require("../../model/Employee");
const {
  getAdministratorByEmailAndStatus,
} = require("../../model/Administrator");

module.exports = {
  login: async (payload: Payload) => {
    try {
      const { email_address, password } = payload;
      try {
        const checkCompany = await getCompanyByEmail(
          "Companies",
          email_address
        );
        if (checkCompany) {
          if (checkCompany[0].company_password === password) {
            return {
              message: checkCompany[0].id,
              user: "company",
              email: checkCompany[0].company_email_address,
              id: checkCompany[0].user_id,
            };
          } else return { message: "Wrong password." };
        }
      } catch (error) {
        try {
          const checkEmployee = await getEmployeeByEmailAndStatus(
            "Users",
            email_address,
            2
          );
          if (checkEmployee) {
            if (checkEmployee[0].user_password === password) {
              return {
                message: checkEmployee[0].company_id,
                user: "employee",
                email: checkEmployee[0].user_email_address,
                id: checkEmployee[0].id,
              };
            } else return { message: "Wrong password." };
          } else throw Error;
        } catch (error) {
          const checkAdministrator = await getAdministratorByEmailAndStatus(
            "Users",
            email_address,
            1
          );
          if (checkAdministrator) {
            if (checkAdministrator[0].user_password === password) {
              return {
                message: checkAdministrator[0].company_id,
                user: "administrator",
                email: checkAdministrator[0].user_email_address,
                id: checkAdministrator[0].id,
              };
            } else return { message: "Wrong password." };
          } else throw Error;
        }
      }
    } catch (error) {
      return { message: "Invalid credentials!" };
    }
  },
};
