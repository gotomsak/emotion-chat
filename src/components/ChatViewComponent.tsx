import React, { useState, useEffect, useRef } from "react";
import MessageBoxComponent from "./MessageBoxComponent";
import { MessageBox, MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { Input } from "react-chat-elements";
import { Button } from "react-chat-elements";
import "semantic-ui-css/semantic.min.css";
import { Grid } from "semantic-ui-react";
import { Avatar } from "react-chat-elements";
import "./ChatViewComponent.css";
const ChatViewComponent: React.FC<{
    Data: any;
    inputEvent: number;
    setInputEvent: any;
}> = ({ Data, inputEvent, setInputEvent }) => {
    const [text, setText] = useState("");
    // const [direction, setDirection] = useState("");
    useEffect(() => {
        // setText(Data.text);
        // setDirection(Data.direction);
    }, [Data]);
    const setRef = useRef<any>(null);
    const sendRefresh = () => {
        Data.push({
            position: "right",
            type: "text",
            text: text,
            date: new Date(),
        });
        setInputEvent(inputEvent + 1);
        setText("");
        console.log(setRef.current);
        setRef.current?.clear();
    };
    const TextInput = (e: any) => {
        console.log(e);
        setText(e.target.value);
    };
    const MessageOnChange = () => {
        return (
            <div className="message-view">
                <MessageList
                    className="message-list"
                    lockable={true}
                    dataSource={Data}
                />
            </div>
        );
    };
    return (
        <div className="wrapper">
            {/* <Avatar
                src={"https://facebook.github.io/react/img/logo.svg"}
                alt={"logo"}
                size="large"
                type="circle flexible"
            /> */}
            {MessageOnChange()}
            <div className="input-message">
                <Input
                    placeholder="入力してください..."
                    multiline={true}
                    onChange={TextInput}
                    ref={setRef}
                    rightButtons={
                        <Button
                            color="white"
                            backgroundColor="black"
                            text="Send"
                            onClick={sendRefresh}
                        />
                    }
                />
            </div>

            {/* <Input ref={inputRef} placeholder="Type here..." /> */}
        </div>
    );
};

export default ChatViewComponent;
