import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ConversationPage from "./pages/ConversationPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ConversationPage} />
        <Route component={ConversationPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
