import React, { useState, useEffect } from "react";
import ChatViewComponent from "../components/ChatViewComponent";

import MessageBoxComponent from "../components/MessageBoxComponent";
import WebCameraComponent from "../components/WebCameraComponent";
import { Grid, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { ExecOptionsWithStringEncoding } from "child_process";
import { happyMessage, sadMessage, normalMessage } from "../datas/messages";
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  
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
    const [graph, setGraph]=useState<object[]>([])

    useEffect(() => {
        console.log(chatViewData);
    }, [chatViewData]);
    useEffect(() => {
        setTimeout(chatViewDataFunc, 2000);
    }, [inputEvent]);
    const chatViewDataFunc = () => {
        
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
        
    };
    const setWebSocketData = (e: any) => {
        console.log(e.data);
        const jsonData = JSON.parse(e.data);

        console.log(jsonData);
        setGraph([
                {
                    name: jsonData["key"][0], emotion:jsonData["value"][0], 
                },
                {
                    name: jsonData["key"][1], emotion:jsonData["value"][1], 
                },
                {
                    name: jsonData["key"][2], emotion:jsonData["value"][2], 
                },
                {
                    name: jsonData["key"][3], emotion:jsonData["value"][3], 
                },
                {
                    name: jsonData["key"][4], emotion:jsonData["value"][4], 
                },
                {
                    name: jsonData["key"][5], emotion:jsonData["value"][5], 
                },
                {
                    name: jsonData["key"][6], emotion:jsonData["value"][6], 
                }
        ])
        
        // if (inputEvent !== 0) {
        //     return;
        // }
        // if (
        //     jsonData["Emotion"] === "NoFacial" ||
        //     jsonData["Emotion"] === "None"
        // ) {
        //     console.log("none");
        // } else {
        //     console.log(jsonData);
        //     setChatViewData((chatViewData) =>
        //         chatViewData.concat([
        //             {
        //                 position: "left",
        //                 type: "text",
        //                 text: "こんにちは",
        //                 date: new Date(),
        //             },
        //         ])
        //     );
        //     setUserEmotion("normal");
        // }
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
                    {/* <h3>あなたの感情: {userEmotion}</h3> */}
                    <BarChart
                        width={500}
                        height={300}
                        data={graph}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* <Bar dataKey="pv" fill="#8884d8" /> */}
                        <Bar dataKey="emotion" fill="#82ca9d" />
                    </BarChart>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default ConversationPage;
