import {
  Logo,
  Words,
  Header as ArwesHeader,
  Highlight,
  withStyles,
} from "arwes";
import { Link } from "react-router-dom";
import Clickable from "./Clickable";
import Centered from "./Centered";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    lineHeight: "80px",
  },
  logo: {
    display: "inherit",
    marginTop: "15px",
  },
  nav: {
    display: "inherit",
  },
  banner: {
    display: "inherit",
    fontWeight: "bold",
    marginLeft: "10px",
    marginRight: "15px",
    fontSize: 28,
  },
  clickable: {
    fontSize: 21,
    "& i": {
      marginRight: theme.padding / 2,
      fontSize: 24,
    },
  },
  link: {
    color: theme.color.content,
    textDecoration: "none",
  },
  button: {
    padding: [0, theme.padding / 2],
  },
  "@media (max-width: 800px)": {
    logo: {
      display: "none",
    },
    img: {
      display: "none",
    },
    banner: {
      display: "none",
    },
    button: {
      padding: [0, 8],
    },
    clickable: {
      fontSize: 16,
    },
  },
});

const Header = (props) => {
  const { classes, onNav, ...rest } = props;
  return (
    <ArwesHeader animate>
      <Centered className={classes.root} {...rest}>
        <nav className={`${classes.nav}`}>
          <Clickable onClick={onNav}>
            <Link className={classes.link} to="/">
              <img
                src={"/favicon.png"}
                alt=""
                className={classes.img}
                style={{
                  marginRight: "10px",
                  position: "relative",
                  top: "15px",
                  height: "50px",
                  width: "auto",
                }}
              />
            </Link>
          </Clickable>
          <Logo animate size={50} className={classes.logo} layer="header" />
          <Words animate className={classes.banner}>
            NASA Mission Control
          </Words>
          <Clickable className={classes.clickable} onClick={onNav}>
            <Link className={classes.link} to="/launch">
              <Highlight className={classes.button} animate layer="header">
                <i className="material-icons">check_circle_outline</i>
                Launch
              </Highlight>
            </Link>
          </Clickable>
          <Clickable className={classes.clickable} onClick={onNav}>
            <Link className={classes.link} to="/upcoming">
              <Highlight className={classes.button} animate layer="header">
                <i className="material-icons">update</i>Upcoming
              </Highlight>
            </Link>
          </Clickable>
          <Clickable className={classes.clickable} onClick={onNav}>
            <Link className={classes.link} to="/history">
              <Highlight className={classes.button} animate layer="header">
                <i className="material-icons">history</i>History
              </Highlight>
            </Link>
          </Clickable>
        </nav>
      </Centered>
    </ArwesHeader>
  );
};

export default withStyles(styles)(Header);
