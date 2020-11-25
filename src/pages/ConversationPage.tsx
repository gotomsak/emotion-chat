import React, { useState, useEffect } from "react";
import ChatViewComponent from "../components/ChatViewComponent";

import MessageBoxComponent from "../components/MessageBoxComponent";
import WebCameraComponent from "../components/WebCameraComponent";
import { Grid, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { ExecOptionsWithStringEncoding } from "child_process";
import { happyMessage, sadMessage, normalMessage } from "../datas/messages";

interface Chat {
    position: string;
    type: string;
    text: string;
    date: any;
}
function ConversationPage() {
    const [blobData, setBlobData] = useState();
    const [userEmotion, setUserEmotion] = useState("");
    const [chatViewData, setChatViewData] = useState<object[]>([]);
    const [webCameraStart, setWebCameraStart] = useState(false);
    const [inputEvent, setInputEvent] = useState(0);

    useEffect(() => {
        console.log(chatViewData);
    }, [chatViewData]);
    useEffect(() => {
        setTimeout(chatViewDataFunc, 2000);
    }, [inputEvent]);
    const chatViewDataFunc = () => {
        if (0 < inputEvent) {
            setChatViewData((chatViewData) =>
                chatViewData.concat([
                    {
                        position: "left",
                        type: "text",
                        text: happyMessage[inputEvent],
                        date: new Date(),
                    },
                ])
            );
        }
    };
    const setWebSocketData = (e: any) => {
        console.log(e.data);
        const jsonData = JSON.parse(e.data);
        console.log(jsonData);
        if (inputEvent !== 0) {
            return;
        }
        if (
            jsonData["Emotion"] === "NoFacial" ||
            jsonData["Emotion"] === "None"
        ) {
            console.log("none");
        } else {
            console.log(jsonData);
            setChatViewData((chatViewData) =>
                chatViewData.concat([
                    {
                        position: "left",
                        type: "text",
                        text: "こんにちは",
                        date: new Date(),
                    },
                ])
            );
            setUserEmotion("normal");
        }
    };

    const webCameraStartButton = () => {
        setWebCameraStart(true);
    };

    return (
        <div>
            <Grid columns={2}>
                <Grid.Column>
                    <ChatViewComponent
                        Data={chatViewData}
                        inputEvent={inputEvent}
                        setInputEvent={setInputEvent}
                    ></ChatViewComponent>
                </Grid.Column>
                <Grid.Column>
                    <WebCameraComponent
                        start={webCameraStart}
                        stop={false}
                        setBlobData={setBlobData}
                        setWebSocketData={setWebSocketData}
                    ></WebCameraComponent>
                    <Button onClick={webCameraStartButton}>start</Button>
                    <h3>あなたの感情: {userEmotion}</h3>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default ConversationPage;
