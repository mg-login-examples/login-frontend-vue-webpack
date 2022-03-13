import { isDevelopmentEnvironment } from "@/utils/envUtils";

describe("Utils > envUtils > index.ts", () => {
  it("checks development environment", () => {
    process.env.VUE_APP_ENV = "production";
    expect(isDevelopmentEnvironment()).toBe(false);
    process.env.VUE_APP_ENV = "development";
    expect(isDevelopmentEnvironment()).toBe(true);
  });
});
