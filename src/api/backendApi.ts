import usersApi from "./modules/users";
import quotesApi from "./modules/quotes";
import emailVerificationsApi from "./modules/emailVerifications";

const api = {
  users: usersApi,
  quotes: quotesApi,
  emailVerifications: emailVerificationsApi,
};

export default api;
