import { body } from "express-validator";
import User from "../models/User";

export const userCreateValidation = () => {
  return [
    body("username")
      .isString()
      .notEmpty()
      .withMessage("Username is required")
      .custom(async (value) => {
        const user = await User.findOne({ where: { username: value } });
        if (user) {
          throw new Error("Username is already taken");
        }
      }),
    body("email")
      .isEmail()
      .withMessage("Email is not valid")
      .custom(async (value) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          throw new Error("Email already exists");
        }
      }),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 5 characters long")
      .isLength({ max: 16 })
      .withMessage("Password must be at most 16 characters long"),
  ];
};

export const userEditValidation = () => {
  return [
    body("username")
      .isString()
      .notEmpty()
      .withMessage("Username is required")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ where: { username: value } });
        if (user && user?.getDataValue("id") != req.params?.id) {
          throw new Error("Username is already taken");
        }
      }),
    body("email")
      .isEmail()
      .withMessage("Email is not valid")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ where: { email: value } });
        if (user && user?.getDataValue("id") != req.params?.id) {
          throw new Error("Email already exists");
        }
      }),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 5 characters long")
      .isLength({ max: 16 })
      .withMessage("Password must be at most 16 characters long"),
  ];
};
