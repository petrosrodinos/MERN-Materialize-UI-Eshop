import * as yup from "yup";

const fromGoogle = yup.object().shape({
  phone: yup
    .string("Only numbers are allowed")
    .trim()
    .required("Phone is reguired")
    .min(5, "Phone should be more than 5 characters")
    .max(10, "Phone not greater than 10 chars."),
  password: yup
    .string()
    .trim()
    .min(5, "Password should be more than 10 characters")
    .max(30, "Password should not excced 30 characters")
    .required("Password is required"),
  address: yup
    .string("Only alphabets are allowed")
    .trim()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required("Address is required"),
});

const register = yup.object().shape({
  phone: yup
    .string("Only numbers are allowed")
    .trim()
    .required("Phone is reguired")
    .min(5, "Phone should be more than 5 characters")
    .max(10, "Phone not greater than 10 chars."),
  password: yup
    .string()
    .trim()
    .min(5, "Password should be more than 10 characters")
    .max(30, "Password should not excced 30 characters")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special Character"
    // )
    .required("Password is required"),
  username: yup
    .string("Only alphabets are allowed")
    .trim()
    .min(3, "Username should be more than 3 characters")
    .max(20, "Username should not excced 20 chars.")
    .required("Username is required"),
  email: yup
    .string("Only alphabets are allowed")
    .email("Please enter a valid email")
    .required("Email is required"),
  address: yup
    .string("Only alphabets are allowed")
    .trim()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required("Address is required"),
});

const login = yup.object().shape({
  password: yup.string().trim().required("Password is required"),
  email: yup
    .string("Only alphabets are allowed")
    .email("Please enter a valid email")
    .required("Email is required"),
});

export const Validators = {
  REGISTER: register,
  FROMGOOGLE: fromGoogle,
  LOGIN: login,
};
