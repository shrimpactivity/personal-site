import { useState, type PropsWithChildren } from "react";
import "./NavTile.css";

interface NavTileProps extends PropsWithChildren {
  width: string;
  height: string;
  borderSize?: string;
  selected: boolean;
}

const NavTile = (props: NavTileProps) => {
  const [hover, setHover] = useState(false);
  const borderSize = props.borderSize ? props.borderSize : "4px";

  const tileStyle = {
    width: props.width,
    height: props.height,
    maxWidth: props.width,
  };

  const horizontalStripeStyle = {
    transition: hover || props.selected ? "width 0.75s" : "none",
    width: hover || props.selected ? "100%" : "0",
    height: borderSize,
  };

  const verticalStripeStyle = {
    transition: hover || props.selected ? "height 0.75s" : "none",
    width: borderSize,
    height: hover || props.selected ? "100%" : "0",
  };

  return (
    <div
      className={`tile ${props.selected ? "selected" : ""}`}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={tileStyle}
    >
      <div style={{ textAlign: "center" }}>{props.children}</div>
      <div
        className="tile-stripe"
        style={{ ...horizontalStripeStyle, top: "0px" }}
      ></div>
      <div
        className="tile-stripe"
        style={{ ...horizontalStripeStyle, bottom: "0px" }}
      ></div>
      <div
        className="tile-stripe"
        style={{ ...verticalStripeStyle, left: "0px" }}
      ></div>
      <div
        className="tile-stripe"
        style={{ ...verticalStripeStyle, right: "0px" }}
      ></div>
    </div>
  );
};

export default NavTile;
