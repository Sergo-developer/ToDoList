import {MessageState, MessageToCreate} from "./App";

const host = "http://localhost:3000"
const getMessages = async () => {
    const response = await fetch(host);
    return response.json(); // parses JSON response into native JavaScript objects
};
const createMessage = async (message: MessageToCreate) => {
    const response = await fetch(host, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow",  // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(message), // body data type must match "Content-Type" header
});
    return response.json(); // parses JSON response into native JavaScript objects
};
const editMessage = async (message: any) => {
    const response = await fetch(host, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",  // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(message), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
};
const deleteMessage = async (id: any) => {
    const response = await fetch(host, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",  // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(id), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
};

export {getMessages, createMessage, editMessage, deleteMessage,}
