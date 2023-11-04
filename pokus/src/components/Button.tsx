import { FunctionComponent, useMemo, type CSSProperties } from "react";
import "./Button.css";

type ButtonType = {
  createGroupButtonText?: string;

  /** Style props */
  buttonPosition?: CSSProperties["position"];
  buttonTop?: CSSProperties["top"];
  buttonLeft?: CSSProperties["left"];
  buttonCursor?: CSSProperties["cursor"];
  buttonFontSize?: CSSProperties["fontSize"];

  /** Action props */
  onButtonContainerClick?: () => void;
};

const Button: FunctionComponent<ButtonType> = ({
  createGroupButtonText,
  buttonPosition,
  buttonTop,
  buttonLeft,
  buttonCursor,
  buttonFontSize,
  onButtonContainerClick,
}) => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      position: buttonPosition,
      top: buttonTop,
      left: buttonLeft,
      cursor: buttonCursor,
    };
  }, [buttonPosition, buttonTop, buttonLeft, buttonCursor]);

  const button1Style: CSSProperties = useMemo(() => {
    return {
      fontSize: buttonFontSize,
    };
  }, [buttonFontSize]);

  return (
    <div
      className="button"
      style={buttonStyle}
      onClick={onButtonContainerClick}
    >
      <b className="button1" style={button1Style}>
        {createGroupButtonText}
      </b>
    </div>
  );
};

export default Button;
