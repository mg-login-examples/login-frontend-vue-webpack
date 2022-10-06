import usersApi from "./modules/users";
import quotesApi from "./modules/quotes";
import emailVerificationsApi from "./modules/emailVerifications";
import userNotesApi from "./modules/user-notes";

const api = {
  users: usersApi,
  quotes: quotesApi,
  emailVerifications: emailVerificationsApi,
  userNotes: userNotesApi,
};

export default api;
