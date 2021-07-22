import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const LoadingSideBar = (props: { length?: number }) => {
  const { length = 5 } = props;
  return (
    <div>
      {Array.from(new Array(length)).map((x, index) => (
        <div key={index}>
          <Skeleton />
        </div>
      ))}
    </div>
  );
};

export default LoadingSideBar;
