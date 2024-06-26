import { toast } from "react-toastify";

export const validateName = (name) => {
  if (!name) {
    toast.warning("Name is required");
    return false;
  }
  if (name.length < 2 || name.length > 100) {
    toast.warning("Name must be between 2 and 100 characters");
    return false;
  }
  return true;
};

export const validateEmail = (email) => {
  if (!email) {
    toast.warning("Email is required");
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    toast.warning("Email is invalid");
    return false;
  }
  return true;
};

export const validateContractType = (contractType) => {
  if (!contractType) {
    toast.warning("Contract type is required");
    return false;
  }
  return true;
};
