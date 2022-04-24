const server = require('./utils/express/index');
const apis = require('./controller/index');
apis.initApi(server)
server.listen(7200)