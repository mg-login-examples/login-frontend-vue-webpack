// https://docs.cypress.io/api/table-of-contents

import { User } from "../features/user.feature";

describe("All Quotes Feature", () => {
  it("visits all quotes page and views all quotes", () => {
    const user = new User();
    user.allQuotesView.open();
    user.allQuotesView.assertOpen();
  });
});
