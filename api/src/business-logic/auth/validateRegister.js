import {
  PASSWORD_TOO_SHORT,
  USERNAME_TOO_SHORT,
  USERNAME_AND_PASSWORD_REQUIRED,
} from "../../util/consts.js";

export default ({ username, password }) => {
  if (!username || !password) {
    return USERNAME_AND_PASSWORD_REQUIRED;
  }
  if (username.length < 3) {
    return USERNAME_TOO_SHORT;
  }
  if (password.length < 8) {
    return PASSWORD_TOO_SHORT;
  }
  return null;
};
