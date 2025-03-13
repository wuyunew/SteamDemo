const env ="development";
const EnvConfig = {
    development: {
        baseApi: "http://develpomet/api",
        mockApi:"http://127.0.0.1:4523/m1/5193937-4859747-e6b46f41"
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
    mock:true,//默认开启mock
}