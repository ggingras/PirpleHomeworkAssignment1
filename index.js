const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const router = require('./lib/router');

const server = http.createServer((req,res) => {

  let data = parseReq(req);

  let decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
      buffer += decoder.write(data);
  });

  req.on('end', async () => {
      buffer += decoder.end();
      data.payload = buffer;

      const response = await router.route(data);

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(response.statusCode);
      res.end(JSON.stringify(response.body));
      console.log("Returning this response: ",response.statusCode,response.body);
  });
});

function parseReq(req)
{
    let parsedUrl = url.parse(req.url, true);
    let path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    let queryString = parsedUrl.query;
    let method = req.method.toLowerCase();
    let headers = req.headers;

    let data = {
        'path' : path,
        'queryString' : queryString,
        'method' : method,
        'headers' : headers,
      };

    return data;
}

server.listen(config.port,() => {
  console.log(`The server is up and running on port ${config.port} in ${config.environment} mode`);
});
