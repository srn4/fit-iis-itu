import { FunctionComponent, useMemo, type CSSProperties } from "react";
import "./UserSetup.css";

type UserSetupType = {
  /** Style props */
  userSetupPosition?: CSSProperties["position"];
  userSetupTop?: CSSProperties["top"];
  userSetupLeft?: CSSProperties["left"];
  userSetupCursor?: CSSProperties["cursor"];

  /** Action props */
  onUserSetupContainer1Click?: () => void;
};

const UserSetup: FunctionComponent<UserSetupType> = ({
  userSetupPosition,
  userSetupTop,
  userSetupLeft,
  userSetupCursor,
  onUserSetupContainer1Click,
}) => {
  const userSetupStyle: CSSProperties = useMemo(() => {
    return {
      position: userSetupPosition,
      top: userSetupTop,
      left: userSetupLeft,
      cursor: userSetupCursor,
    };
  }, [userSetupPosition, userSetupTop, userSetupLeft, userSetupCursor]);

  return (
    <div
      className="user-setup"
      style={userSetupStyle}
      onClick={onUserSetupContainer1Click}
    >
      <img className="user-setup-child" alt="" src="/ellipse-1@2x.png" />
      <div className="user-setup1">
        <div className="material-symbolsmenu" />
        <div className="user-setup-item" />
        <b className="jmno-pijmen">
          <p className="jmno">Jméno</p>
          <p className="jmno">Přijmení</p>
        </b>
        <img className="vector-icon" alt="" src="/vector.svg" />
      </div>
    </div>
  );
};

export default UserSetup;
