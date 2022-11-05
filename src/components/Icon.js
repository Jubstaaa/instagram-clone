import React from "react";
import SVG from "react-inlinesvg";

function Icon({ name, size = 16, ...props }) {
  return (
    <SVG
      src={`${process.env.PUBLIC_URL}/icons/${name}.svg`}
      width={size}
      height={size}
      //   preProcessor={(code) =>
      //     code.replace(/fill=".*?"/g, 'fill="currentColor"')
      //   }
      {...props}
    />
  );
}

export default Icon;
