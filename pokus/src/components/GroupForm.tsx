import { FunctionComponent, useCallback } from "react";
import UserSetup from "./UserSetup";
import Home from "./Home";
import "./GroupForm.css";

const GroupForm: FunctionComponent = () => {
  const onUserSetupContainer1Click = useCallback(() => {
    // Please sync "detail uctu" to the project
  }, []);

  const onHomeContainerClick = useCallback(() => {
    // Please sync "main" to the project
  }, []);

  return (
    <div className="frame12">
      <b className="skupiny1">Skupiny</b>
      <div className="frame-child1" />
      <b className="search-bar">search bar</b>
      <UserSetup
        userSetupPosition="absolute"
        userSetupTop="10px"
        userSetupLeft="1125px"
        userSetupCursor="pointer"
        onUserSetupContainer1Click={onUserSetupContainer1Click}
      />
      <Home
        homePosition="absolute"
        homeTop="31px"
        homeLeft="0px"
        homeCursor="pointer"
        onHomeContainerClick={onHomeContainerClick}
      />
      <img className="line-icon" alt="" src="/line-3.svg" />
      <img className="frame-child2" alt="" src="/line-4.svg" />
    </div>
  );
};

export default GroupForm;
