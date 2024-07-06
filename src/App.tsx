import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {createMessage, deleteMessage, editMessage, getMessages} from "./api";

export type MessageState = {
    _id: string;
    name: string;
    description: string;
}

export type MessageToCreate = {
    name: string;
    description: string;
}

function App() {
    const [message, setMessage] = useState<MessageState[]>([])
    const [name, setName] = useState<string>('name')
    const [description, setDescription] = useState<string>('description')
    const [id, setId] = useState<string | null>(null)

    const nameOnChange = (event: any) => {
        setName(event.target.value)
    }
    const descriptionOnChange = (event: any) => {
        setDescription(event.target.value)
    }

    const sendCreatedMessage = () => {
        createMessage({name: name, description: description});
        window.location.reload();
    }

    const sendDeleteMessage = (id: string) => {
        deleteMessage({_id: id})
        window.location.reload();
    }

    const sendEditMessage = () => {
        editMessage({_id: id, name: name, description: description});
        setName("name")
        setDescription("description")
        setId(null)
        window.location.reload();
    }

    const choseMessageToEdit = (message: MessageState) => {
        setId(message._id)
        setName(message.name)
        setDescription(message.description)
    }

    useEffect(() => {
        (async () => {
            const messages = await getMessages()
            setMessage(messages)
        })()
    }, [])

    return (
        <div className="app-wrapper">
            <div className="app-block">
                <div className="messages-block">
                    <div className="lable-wrapper">
                        <div>Name</div>
                        <div>Message</div>
                        <div>Edit</div>
                    </div>
                    {message.map((el) => (
                        <div>
                            <div className="message-wrapper">
                                <div>{el.name}</div>
                                <div>{el.description}</div>
                                <div className="button-wrapper">
                                    <div onClick={() => choseMessageToEdit(el)}
                                         className="message-button edit"></div>
                                    <div onClick={() => sendDeleteMessage(el._id)}
                                         className="message-button delete">X
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="description-wrapper">
                    <input value={name} onChange={nameOnChange} maxLength={32} className="input-border" type="text"></input>
                    <input value={description} onChange={descriptionOnChange} maxLength={256} className="input-border description" type="text"></input>
                    {id ?
                        <button className="input-border" onClick={() => sendEditMessage()}>Изменить</button> :
                        <button className="input-border" onClick={() => sendCreatedMessage()}>Отправить</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
