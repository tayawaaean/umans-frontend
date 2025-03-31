import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export const registerSchema = yup.object().shape({
  firstName: yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  lastName: yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobileNo: yup.string().min(11, "Mobile number must be 11 characters").max(11, "Mobile number must be 11 characters").matches(/^[0-9]+$/, "Must be only number digits").required("Mobile number is required"),
  office: yup.string().min(3, "Office must be at least 3 characters").required("Office is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const registerAppSchema = yup.object().shape({
  name: yup.string().min(2, "App name must be at least 3 characters").required("Name is required"),
  url: yup.string().url("Invalid URL format").required("App url is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: yup.string().min(11, "Mobile number must be 11 characters").max(11, "Mobile number must be 11 characters").matches(/^[0-9]+$/, "Must be only number digits").required("Mobile number is required"),
  ownerOffice: yup.string().min(2, "Office must be at least 3 characters").required("Office is required"),

});