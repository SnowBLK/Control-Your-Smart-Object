// fonction qui envoie une reaquete HTTP POST 
function postRequest(url, json) {
    const timeoutTime = 500;
    return new Promise(function(resolve, reject) {
        const controller = new AbortController();
        setTimeout(function() {
            reject(new Error("AbortTimeout"));
            controller.abort()
        }, timeoutTime);
        fetch('http://'+url, {
            method: 'POST', 
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
}

// fonction qui envoie une reaquete HTTP GET 
function getRequest(url) {
    return new Promise(function(resolve, reject) {
        fetch('http://'+url, {
            headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((data) => {
            resolve(data);
        }).catch(err => reject(err));
    });
}

// focntion qui test l'adresse ip du bridge
function testIP(ip) {
    const timeoutTime = 1000;
    return new Promise(function(resolve, reject) {
        const controller = new AbortController();
        setTimeout(function() {
            reject(new Error("AbortTimeout"));
            controller.abort()
        }, timeoutTime);
        fetch('http://'+ip+'/api', {
            method: 'GET', 
            signal: controller.signal
        })
        .then(response => {
            if (response.status == 200)
                resolve(true);
            else 
                throw new Error("Unknown error occurred");
        })
        .catch(err => reject(err));
    });
}

