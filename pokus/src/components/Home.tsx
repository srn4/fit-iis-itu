import { FunctionComponent, useMemo, type CSSProperties } from "react";
import "./Home.css";

type HomeType = {
  /** Style props */
  homePosition?: CSSProperties["position"];
  homeTop?: CSSProperties["top"];
  homeLeft?: CSSProperties["left"];
  homeCursor?: CSSProperties["cursor"];

  /** Action props */
  onHomeContainerClick?: () => void;
};

const Home: FunctionComponent<HomeType> = ({
  homePosition,
  homeTop,
  homeLeft,
  homeCursor,
  onHomeContainerClick,
}) => {
  const homeStyle: CSSProperties = useMemo(() => {
    return {
      position: homePosition,
      top: homeTop,
      left: homeLeft,
      cursor: homeCursor,
    };
  }, [homePosition, homeTop, homeLeft, homeCursor]);

  return (
    <div className="home" style={homeStyle} onClick={onHomeContainerClick}>
      <div className="home-child" />
      <div className="button2">
        <b className="button3">Hlavní stránka</b>
      </div>
      <img
        className="clarityhome-solid-icon"
        alt=""
        src="/clarityhomesolid.svg"
      />
    </div>
  );
};

export default Home;
