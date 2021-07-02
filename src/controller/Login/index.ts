import { Payload, Email, Password } from "../../model/Company/types";
import jwt from "jsonwebtoken";

const { getCompanyByEmail } = require("../../model/Company");
const { getEmployeeByEmailAndStatus } = require("../../model/Employee");
const {
  getAdministratorByEmailAndStatus,
} = require("../../model/Administrator");

const handleCompanyLogin = async (email_address: Email, password: Password) => {
  try {
    const checkCompany = await getCompanyByEmail("Company", email_address);

    if (!checkCompany) throw Error;
    if (checkCompany[0].password !== password)
      return { message: "Wrong password." };
    const token = access_token(
      checkCompany[0].email_address,
      checkCompany[0].id,
      "company",
      checkCompany[0].user_id
    );
    return { message: token };
  } catch (error) {
    return handleEmployeeLogin(email_address, password);
  }
};

const handleEmployeeLogin = async (
  email_address: Email,
  password: Password
) => {
  try {
    const checkEmployee = await getEmployeeByEmailAndStatus(
      "User",
      email_address,
      2
    );

    if (!checkEmployee) throw Error;
    if (checkEmployee[0].password !== password)
      return { message: "Wrong password." };
    const token = access_token(
      checkEmployee[0].email_address,
      checkEmployee[0].company_id,
      "employee",
      checkEmployee[0].id
    );
    return { message: token };
  } catch (error) {
    return handleAdministratorLogin(email_address, password);
  }
};

const handleAdministratorLogin = async (
  email_address: Email,
  password: Password
) => {
  try {
    const checkAdministrator = await getAdministratorByEmailAndStatus(
      "User",
      email_address,
      1
    );

    if (!checkAdministrator) throw Error;
    if (checkAdministrator[0].password !== password)
      return { message: "Wrong password." };
    const token = access_token(
      checkAdministrator[0].email_address,
      checkAdministrator[0].company_id,
      "administrator",
      checkAdministrator[0].id
    );
    return { message: token };
  } catch (error) {
    const { message } = error;

    if (
      message ===
      "None of the pools have an opened connection and failed to open a new one."
    )
      return { message: "Database Down!" };
    return { message: "Invalid credentials!" };
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

    if (!email_address || !password) return { message: "Invalid credentials!" };
    return handleCompanyLogin(email_address, password);
  },
};
