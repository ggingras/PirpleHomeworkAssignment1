const helloController = require('../controllers/hello');

const handlers = [
  {
    path: 'hello',
    methods: ['get']
  },
];

const controllers = {
  'hello': helloController,
};

const route = async (data) =>
{
    const controller = isValidHandler(data.path, data.method) ? controllers[data.path] : false;

    return controller ? await controller[data.method](data) :
    {
      statusCode: isValidPath(data.path) ? 405 : 400,
      body: isValidPath(data.path) ? 'Method not allowed' : 'Invalid Path',
    };
}

function isValidHandler(path, method)
{
    return handlers.map(r => r.path).includes(path) && handlers.find(r => r.path === path).methods.includes(method);
}

function isValidPath(path)
{
    return handlers.map(r => r.path).includes(path);
}

const router = {
    route: route
};

module.exports = router;
