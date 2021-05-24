module.exports = (
  filterPrefix = "SVELTE_APP_",
  targetPrefix = "process.env.",
  excluded = [],
) => {
  const FRONTEND_APP_ENV_VARS = {};
  for (let key in process.env) {
    if (key.startsWith(filterPrefix) && !excluded.includes(key))
      FRONTEND_APP_ENV_VARS[targetPrefix + key] = "'" + process.env[key] + "'";
  }
  return FRONTEND_APP_ENV_VARS;
};
