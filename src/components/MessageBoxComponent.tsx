import { MessageBox } from "react-chat-elements";
import React, { useState, useEffect } from "react";
import "react-chat-elements/dist/main.css";

const MessageBoxComponent: React.FC<{ text: string; direction: string }> = ({
    text,
    direction,
}) => {
    return <MessageBox position={direction} type={"text"} text={text} />;
};

export default MessageBoxComponent;
