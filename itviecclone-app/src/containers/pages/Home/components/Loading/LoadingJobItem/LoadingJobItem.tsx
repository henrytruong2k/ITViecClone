import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Box } from "@material-ui/core";

const LoadingJobItem = (props: { length?: number }) => {
  const { length = 10 } = props;
  return (
    <div>
      {Array.from(new Array(length)).map((x, index) => (
        <Box key={index} marginBottom="24px">
          <Skeleton variant="rect" height={173} />
        </Box>
      ))}
    </div>
  );
};

export default LoadingJobItem;
