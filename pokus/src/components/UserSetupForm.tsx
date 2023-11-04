import { FunctionComponent } from "react";
import "./UserSetupForm.css";

const UserSetupForm: FunctionComponent = () => {
  return (
    <div className="user-setup2">
      <div className="material-symbolsmenu1" />
      <div className="user-setup-inner" />
      <b className="jmno-pijmen1">
        <p className="jmno1">Jméno</p>
        <p className="jmno1">Přijmení</p>
      </b>
      <img className="vector-icon1" alt="" src="/vector.svg" />
    </div>
  );
};

export default UserSetupForm;
