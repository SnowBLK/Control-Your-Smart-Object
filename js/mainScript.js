let allRooms = {};
let selectedRoomID = -1;



const allowedGroups = ["Room", "Zone"];
const allowedLights = ["Dimmable light"];

// fonction pour log out
function logOut() {
    localStorage.removeItem("hueAcc");
    location.reload();
}

// récupérer les coordonnées de connection déjà sauvgardées
function getAccess() {
    let acc = {};
    let localAcc = localStorage.getItem('hueAcc');
    if (localAcc) {
        acc = JSON.parse(localAcc);
    } else {
        console.error("Access credentials not saved")
    }
    return acc;
}


// récupérer les données des chambres
function getHueRooms(acc) {
    return new Promise((resolve, reject) => {
        getRequest(acc.ip + '/api/' + acc.token + '/groups').then(data => {

            let rooms = [];
            let roomId = 0;
            for (const [key, value] of Object.entries(data)) {
                if (value && allowedGroups.includes(value.type)) {
                    let roomObj = {
                        name: value.name,
                        on: value.state.any_on,
                        bri: value.action.bri,
                        lightsInRoom: value.lights,
                        key: roomId,
                        id: key
                    }
                    rooms.push(roomObj);
                    roomId++;
                }
            }
            allRooms = rooms;
            resolve(rooms);
        }).catch(err => reject(err));
    });
}

// récupérer les données des ampoules
function getHueLights(acc) {
    return new Promise((resolve, reject) => {
        getRequest(acc.ip + '/api/' + acc.token + '/lights').then(data => {
            let lights = [];
            for (const [key, value] of Object.entries(data)) {
                if (value && allowedLights.includes(value.type)) {
                    let lightObj = {
                        name: value.name,
                        on: value.state.on,
                        bri: value.state.bri,
                        reachable: value.state.reachable,
                        id: key
                    }
                    lights.push(lightObj);
                }
            }
            resolve(lights);
        }).catch(err => reject(err));
    });
}
