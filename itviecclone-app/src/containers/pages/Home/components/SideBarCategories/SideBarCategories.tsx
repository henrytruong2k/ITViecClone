import React from "react";
import Category from "../../../../../types/Category";
import { Box } from "@material-ui/core";
import { Col } from "react-bootstrap";
import LoadingSideBar from "../Loading/LoadingSideBar/LoadingSideBar";

const SideBarCategories = (props: { list: Category[]; loading: boolean }) => {
  const { list, loading } = props;

  return (
    <Col sm={3}>
      <Box>
        <h3>List categories</h3>
        <div>
          {loading ? (
            <LoadingSideBar length={10} />
          ) : (
            list.map((item) => {
              return <p key={item.id}>{item.name}</p>;
            })
          )}
        </div>
      </Box>
    </Col>
  );
};

export default SideBarCategories;
