# Svelte Environment Variables

This module helps you manage environment variables in your Rollup/Webpack bundled app. The examples below use Sapper, but this is also applicable to Svelte as well as any Rollup or Webpack bundled app.

This module looks for any env variable in your `process.env` with the prefix you've set (default value is `SVELTE_APP_`) and replaces them in the build process in your frontend. It works great with [env-cmd](https://www.npmjs.com/package/env-cmd) if you are using a .env file or you could directly make the environment variable available in the runtime of your choosing.

This module will load variables from your environment variables and check for the presence of the prefix. In case it finds the specified prefix, it will replace instances of `process.env.PREFIX` in your frontend code with the actual value of the environment variable.

## Usage

Steps to set this up are:

### 1. Install

```
npm install svelte-environment-variables --save-dev
```

OR

```
yarn add svelte-environment-variables
```

### 2. Include environment variables

There are numerous ways to add environment variables to your runtime. One of the easy ways to do it is to use [env-cmd](https://www.npmjs.com/package/env-cmd). Just create a `.env` file in your root directory and add a script to your package JSON to use it like so

**Package.json**

```json
{
  "scripts": {
    "env:dev": "env-cmd npm run dev"
  }
}
```

With env-cmd, you can define all your environment variables in one place including the variables your SSR Node.js app might need. Only the variables with the _prefix_ are replaced in the frontend. The rest are available on `process.env` in your Node.JS app.

Additional options available with env-cmd are available [here](https://github.com/toddbluhm/env-cmd#readme)

### 3. Import

Now we need to include this package in our bundle config file. We do it like so.

#### ES6

```javascript
import includeEnv from "svelte-environment-variables";
```

#### CommonJS

```javascript
const includeEnv = require("svelte-environment-variables");
```

### 4. Use at compile time

For Rollup, we add `...includeEnv()` to the [Rollup Replace plugin](https://www.npmjs.com/package/@rollup/plugin-replace) options.

```javascript
client: {
    plugins: [
        replace({
            ...includeEnv(),
        }),
```

For Webpack, we add `...includeEnv()` to the [Webpack DefinePlugin](https://webpack.js.org/plugins/define-plugin/) options.

```javascript
module.exports = {
	client: {
		plugins: [
			new webpack.DefinePlugin({
			    ...includeEnv(),
			}),
```

### 5. Use the environment variables in code

Let's use an `.env` file created at the root of your project with this content:

```
SVELTE_APP_ENV1="abcdxyz"
```

Then from any svelte component in your Sapper App:

```
console.log(process.env.SVELTE_APP_ENV1)
```

And you should see `abcdxyz` in the console.

### 6. Options

- filterPrefix
  - This is the prefix in your environment variables that will be checked and only when matched will replace occurences in your client side code
  - Default value: `"SVELTE_APP_"`
- targetPrefix
  - This is the prefix in your client side code that will be checked for and will be concatenated with the filter prefix to get the final string text that will be replaced in your client side code
  - Default value: `"process.env."`
- excluded
  - This is an array of environment variables that will be excluded even if they have the filter prefix on them
  - Default value: `[]` (blank array)
