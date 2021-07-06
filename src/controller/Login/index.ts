import { Payload, Email, Password } from "../../model/Company/types";
import jwt from "jsonwebtoken";

const { getCompanyByEmail } = require("../../model/Company");
const { getEmployeeByEmailAndStatus } = require("../../model/Employee");
const {
  getAdministratorByEmailAndStatus,
} = require("../../model/Administrator");

const handleCompanyLogin = async (
  email_address: Email,
  login_password: Password
) => {
  try {
    const checkCompany = await getCompanyByEmail("Company", email_address);
    
    if (!checkCompany.length) {
      return handleEmployeeLogin(email_address, login_password);
    }
    const { password, id, user_id } = checkCompany[0];

    if (password !== login_password)
      return "Wrong password.";

    return access_token(email_address, id, "company", user_id);
  } catch (error) {
    const { message } = error;
    if (
      message ===
      "None of the pools have an opened connection and failed to open a new one."
    )
      return "Database down!";
  }
};

const handleEmployeeLogin = async (
  email_address: Email,
  login_password: Password
) => {
  try {
    const checkEmployee = await getEmployeeByEmailAndStatus(
      "User",
      email_address,
      2
    );

    if (!checkEmployee.length) {
      return handleAdministratorLogin(email_address, login_password);
    }
    const { password, company_id, id } = checkEmployee[0];

    if (password !== login_password)
      return "Wrong password.";

    return access_token(email_address, company_id, "employee", id);
  } catch (error) {
    const { message } = error;
    if (
      message ===
      "None of the pools have an opened connection and failed to open a new one."
    )
      return "Database down!";
  }
};

const handleAdministratorLogin = async (
  email_address: Email,
  login_password: Password
) => {
  try {
    const checkAdministrator = await getAdministratorByEmailAndStatus(
      "User",
      email_address,
      1
    );

    if (!checkAdministrator.length)
      return "Email does not exist.";

    const { password, company_id, id } = checkAdministrator[0];

    if (password !== login_password)
      return "Wrong password.";

    return access_token(email_address, company_id, "administrator", id);
  } catch (error) {
    const { message } = error;
    if (
      message ===
      "None of the pools have an opened connection and failed to open a new one."
    )
      return "Database down!";
  }
};

const access_token = (
  user_email: string,
  company_id: string,
  user: string,
  user_id: string
) => {
  const message = jwt.sign(
    {
      user_email: user_email,
      company_id: company_id,
      user: user,
      user_id: user_id,
    },
    "N3wst@t10n"
  );
  return message;
};

module.exports = {
  login: (payload: Payload) => {
    const { email_address, password } = payload;
  
    return handleCompanyLogin(email_address, password);
  },
};
