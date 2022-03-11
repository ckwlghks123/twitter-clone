import dotenv from "dotenv";

dotenv.config();

function required(key, defaultVal = undefined) {
  const value = process.env[key] || defaultVal;
  console.log(value);
  if (!value) {
    throw new Error(`key ${key} is undefined`);
  }
  return value;
}

// export const config = {
//   jwt: {
//     secretKey: process.env.JWT_SECRET,
//     expiresSec: process.env.JWT_EXP_SECOND,
//   },
//   bcrypt: {
//     salt: Number(process.env.BCRYPT_SALT),
//   },
// };

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresSec: required("JWT_EXP_SECOND"),
  },
  bcrypt: {
    salt: Number(required("BCRYPT_SALT")),
  },
  host: {
    port: required("HOST_PORT", 4000),
  },
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
    port: required("DB_PORT"),
  },
};
