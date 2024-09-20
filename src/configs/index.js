const env=import.meta.env.MOOE || "development";
const EnvConfig={
    development:{
        baseApi:"/development/api",
    },
    text:{
        baseApi:"/test/api",
    },
    prod:{
        baseApi:"/prod/api",
    },
};

export default{
    env,
    ...EnvConfig[env],
}