import { FunctionComponent, CSSProperties } from "react";
import "./Button.css";

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button: FunctionComponent<ButtonProps> = ({ text, onClick }) => {
  const buttonStyle: CSSProperties = {
    cursor: "pointer", // Change cursor to pointer on hover
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="button" style={buttonStyle} onClick={handleClick}>
      {text}
    </div>
  );
};

export default Button;


