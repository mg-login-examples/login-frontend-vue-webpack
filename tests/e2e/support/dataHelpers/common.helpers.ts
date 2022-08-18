export default class CommonHelpers {
  static waitForSeconds(waitTimeInSeconds: string) {
    const ms = parseInt(waitTimeInSeconds, 10) * 1000;
    cy.wait(ms);
  }
}
