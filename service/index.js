const lodash = require('lodash');
const fs = require("fs")
const fileutil = require("../utils/file.util")
const processUtil = require('../utils/procss.util');
module.exports = {
    test(dt) {
        const mirrorName = `registry.cn-chengdu.aliyuncs.com/langyi/camel-ops-edge:${dt}`
        const ymlName = "docker-compose.yaml", rdHome = `/opt/rd-spec/apps/camel/camel-ops-edge`, ymlPath = `${rdHome}${ymlName}`
        let yamlContent = fs.readFileSync(ymlPath, 'utf8');
        let yamlContentNew = yamlContent.replace(/image: .+/g, `image: ${mirrorName}`)
        // console.log(yamlContentNew);
        fileutil.touchFile(`./.cicd.history/${ymlName}.${dt}`, yamlContent)
        fileutil.touchFile(`./${ymlName}`, yamlContentNew)

        // console.log(cmd);
        processUtil.exec(`cd ${rdHome} && git add . && git commit -am 'cicd update ${mirrorName}' && git push`, () => {
            processUtil.exec(`cd ${rdHome} && docker-compose up -d`)
        })
    }
}