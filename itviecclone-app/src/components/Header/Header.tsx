import { Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs, jobAmount } from "../../containers/pages/Home/jobSlice";
import { RootState } from "../../store/store";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { removeFavoriteList } from "../../containers/pages/Home/favoriteJobSlice";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  dispatch(fetchAllJobs({}));
  const total = useSelector(jobAmount);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const posts = useSelector((state: RootState) => state.favorite.favoriteList);

  const handleRemovePost = (id: number) => {
    const action = removeFavoriteList(id);
    dispatch(action);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box display="flex" justifyContent="center" ml={2} mr={2}>
        <h4>Your favorite posts ({posts.length})</h4>
      </Box>
      {posts.map((post) => {
        return (
          <MenuItem key={post.id} onClick={handleMenuClose}>
            <Box display="flex" alignItems="center">
              <a href={post.url} target="_blank" rel="noreferrer">
                {post.company_logo_url ? (
                  <img
                    src={post.company_logo_url}
                    width="50"
                    height="50"
                    alt={post.title}
                  />
                ) : (
                  <img
                    src="./placeholder-image.png"
                    width="50"
                    height="50"
                    alt=""
                  />
                )}
              </a>
              <Box display="flex">
                <Box ml={1} mr={1}>
                  <a href={post.url} target="_blank" rel="noreferrer">
                    <h6>{post.title}</h6>
                  </a>
                </Box>
                <HighlightOffIcon
                  fontSize="small"
                  onClick={() => handleRemovePost(post.id)}
                />
              </Box>
            </Box>
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {process.env.REACT_APP_WEBSITE_NAME}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Typography variant="h6">Total jobs: {total}</Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label={`show ${posts.length} new posts`}
              color="inherit"
              onClick={handleMenuOpen}
            >
              <Badge badgeContent={posts.length} color="secondary">
                <FavoriteBorder />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Typography>LOGIN</Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </div>
  );
};

export default Header;
