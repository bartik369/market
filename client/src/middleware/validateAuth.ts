import { IAuthData } from "../types/auth";

export default function validateLogin(authData: IAuthData) {
    let errors = {
      email: '',
      password: '',
      repeatPassword: '',
    };

    if (!authData.email) {
      errors.email = "Email requided";
    } else if (!/\S+@\S+\.\S+/.test(authData.email)) {
      errors.email = "Email address is invalid";
    }

    if (!authData.password) {
      errors.password = "Password is required";
    } else if (
      (authData.password.length !== 0  && authData.repeatPassword.length !== 0) 
      && (authData.password !== authData.repeatPassword)) {
      errors.password = "Do not match";
      errors.repeatPassword = "Do not match";

    }
    return errors;
  }