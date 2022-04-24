var process = require('child_process');
module.exports = {
    exec(cmd, stdoCb, stdeCb) {
        console.log(`init: ${cmd}`);
        const cmd = process.exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`[执行错误] ${cmd}\n`);
                stdeCb(error)
            }else {
                stdoCb()
            }
            console.log(stdout, stderr);
            cmdProcess.kill()
        })
    }
}