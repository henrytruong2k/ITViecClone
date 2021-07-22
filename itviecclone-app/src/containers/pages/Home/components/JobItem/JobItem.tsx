import React from "react";
import Job from "../../../../../types/Job";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteList } from "../../favoriteJobSlice";
import { RootState } from "../../../../../store/store";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #000",
    borderRadius: theme.spacing(0.5),
  },
  box_contain: {
    padding: "10px",
    "& h3": {
      marginTop: 0,
      marginBottom: theme.spacing(1),
    },
    "& p": {
      marginTop: 0,
      marginBottom: theme.spacing(1),
    },
  },
  box_info: {
    justifyContent: "space-between",
    "& span": {
      padding: 0,
    },
  },
}));

const JobItem = (props: { item: Job }) => {
  const { item } = props;
  const list = useSelector((state: RootState) => state?.favorite?.favoriteList);
  const IDs = list?.map((item) => item.id);
  const clicked = IDs?.includes(item.id);
  const [checkedSave, setCheckedSave] = React.useState(clicked);

  const classes = useStyles();
  const publishDesc = item.description
    .replace(/<\/?[^>]+(>|$)/g, "")
    .substr(0, 200)
    .concat("...");
  const publishDate = item.publication_date;
  const dispatch = useDispatch();
  const handleChange = (item: Job) => {
    const action = addFavoriteList(item);
    dispatch(action);
    setCheckedSave(!checkedSave);
  };
  return (
    <Box className={classes.root} display="flex" mb={3}>
      <a href={item.url} target="_blank" rel="noreferrer" title={item.title}>
        {item.company_logo_url ? (
          <img
            src={item.company_logo_url}
            width="173"
            height="173"
            alt={item.company_name}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = "./placeholder-image.png";
            }}
          />
        ) : (
          <img src="./placeholder-image.png" width="173" height="173" alt="" />
        )}
      </a>
      <Box className={classes.box_contain}>
        <a href={item.url} target="_blank" rel="noreferrer" title={item.title}>
          <h3>{item.title}</h3>
        </a>
        <p>{publishDesc}</p>
        <Box display="flex" className={classes.box_info}>
          <p>
            Salary: <b>{item.salary ? item.salary : "Wage agreement"}</b>
          </p>
          <p>
            Category: <b>{item.category}</b>
          </p>

          <p>{moment(publishDate).fromNow()}</p>
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={checkedSave}
                onChange={() => handleChange(item)}
              />
            }
            label=""
          />
        </Box>
      </Box>
    </Box>
  );
};

export default JobItem;
