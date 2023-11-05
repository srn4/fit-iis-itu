import { FunctionComponent, useState } from "react";
import GroupList from "../components/GroupList";
import Form from "../components/Form";
import "./Skupiny.css";
import axios from "axios";

const Skupiny: FunctionComponent = () => {
  
  return (
    <div className="skupiny">
    <div className="container">
        <Form />
        <GroupList />
      </div>
    </div>
  );
};

export default Skupiny;

