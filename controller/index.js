const service = require('../service/index')
const lodash = require('lodash'); 
module.exports = {
    initApi: (server) => {
        server.get('/deploy/prod', (request, response) => { //3
            const { dt, id } = request.query
            if (!lodash.isEmpty(dt) && !lodash.isEmpty(id)) {
                const handler = service[id || ""]
                if (handler) {
                    handler()
                } else {
                    console.log(`不存在的处理线，${request.url}`);
                }
            } else {
                console.log(`参数异常:id:${id}\dt:${dt}`);
            }
            response.end("ok");
        });
    }
}