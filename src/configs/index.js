const env = import.meta.env.MOOE || "development";
const EnvConfig = {
    development: {
        baseApi: "http://develpomet/api",
    },
    text: {
        baseApi: "http://test/api",
    },
    prod: {
        baseApi: "http://prod/api",
    },
};

export default {
    env,
    ...EnvConfig[env],
}