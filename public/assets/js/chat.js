var chatSocket;

function setCallbacks(onChat = null, onUserCount, onNewsTicker, onShout, onMerchandise, onHeart, onGift) {
    callbacks = {
        "20": onChat,
        "36": onUserCount,
        "37": onNewsTicker,
        "38": onShout,
        "60": onMerchandise,
        "80": onHeart,
        "82": onGift,
    }
    return callbacks
}

function connect(guardUrl, callbacks) {
    try {
        // Connect to guardUrl    
        var ws = new WebSocket(guardUrl);

        ws.onopen = function (evt) {
             // Request to join chat room  
            ws.send(JSON.stringify({ "action_type": "join_chat_room", "username": "Catherine" }));
        }

        ws.onclose = function (evt) {
            ws = null;
        }

        ws.onmessage = function (evt) {
            objData = JSON.parse(evt.data);
            // Request to join chat room  granted
            if (objData['action_type'] === 'join_chat_success') {
                room_id = objData.room_id;
                token_id = objData.token;
                connectChat(callbacks, room_id, token_id)
            }
        }

        ws.onerror = function (evt) {
            console.log("ERROR: " + evt.data);
        }
    } catch (exception) {
        console.log(exception);
    }
}

function disconnect() {
    if( chatSocket !== null ) {
        chatSocket.close();
        chatSocket = null;
    }    
}

function connectChat(callbacks, room_id, token) {
    //Connect to chat room
    var host = ""
    if (env == "p") {
        host = "wss://gschat.goplay.co.id/chat";
    } else {
        host = "wss://g-gschat.goplay.co.id/chat";
    }
    try {
        chatSocket = new WebSocket(host);
        chatSocket.onopen = function (evt) {
            objAuth = { "ct": 10, "room_id": room_id, "token": token }
            authMsg = JSON.stringify(objAuth);
            chatSocket.send(authMsg);
        }

        chatSocket.onmessage = function (evt) {
            objData = JSON.parse(evt.data);
            contentType = objData.ct.toString();
            if (callbacks[contentType]) {
                callbacks[contentType](objData)
            }
        }

        chatSocket.onerror = function (ev) {
            chatSocket.close();
            chatSocket = null;
            connectChat(callbacks, room_id, token);
        }

    } catch (exception) {
        console.log('<p>Error' + exception);
    }
}
