const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";

function requestSync(url) {
    //write code to request url synchronously
    const start = Date.now();

    var request = require('sync-request');
    request('GET', url);

    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
}

requestSync(url) // would print out the execution time
requestSync(url)
requestSync(url)