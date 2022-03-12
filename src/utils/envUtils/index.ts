export const isDevelopmentEnvironment = (): boolean => {
  return (
    process.env.VUE_APP_ENV === "development" ||
    process.env.VUE_APP_ENV === "local"
  );
};
