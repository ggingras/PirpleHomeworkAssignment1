let environments = {};

environments.dev = {
    'port' : 3000,
    'environment' : 'dev'
};

environments.prod = {
    'port' : 3000,
    'environment' : 'prod'
}

let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : 'dev';

let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.dev;

module.exports = environmentToExport;