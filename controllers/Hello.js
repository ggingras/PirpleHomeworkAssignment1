
const helloGet = async (data) => {

    let statusCode =  406;
    let body = {'Message':'Welcome to this Hello world restful api.'};

    return {statusCode, body};    
};

module.exports = {
    get: helloGet,
  };