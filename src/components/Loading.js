import React from "react";
import Spin from "react-cssfx-loading/lib/Spin";

const Loading = () => {
  return (
    <div
      style={{
        margin: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin color="black" width="80px" height="80px" duration="1s" />
    </div>
  );
};

export default Loading;
