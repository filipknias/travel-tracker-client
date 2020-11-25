import React, { useState } from "react";
import PropTypes from "prop-types";
// Components
import MapThemeDialog from "../Dialogs/MapThemeDialog";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
// Icons
import LocationIcon from "@material-ui/icons/GpsFixed";
import OptionsIcon from "@material-ui/icons/Settings";
import ThemeIcon from "@material-ui/icons/Explore";
// Redux
import { connect } from "react-redux";
import { setCurrentUserPosition } from "../../redux/actions/dataActions";
import { setMapThemeDialogOpen } from "../../redux/actions/interfaceActions";

const useStyles = makeStyles((theme) => ({
  mapBtn: {
    borderRadius: "50%",
    padding: 20,
    margin: "0 15px",
  },
  btnGroup: {
    display: "flex",
    position: "absolute",
    bottom: 50,
    right: 30,
    [theme.breakpoints.down("sm")]: {
      bottom: 30,
      right: 20,
    },
  },
  popoverHeader: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 15,
  },
}));

const MapButtons = ({
  data,
  setCurrentUserPosition,
  setMapThemeDialogOpen,
}) => {
  const classes = useStyles();
  // State
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const OptionsPopover = () => {
    return (
      <>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Typography variant="subtitle1" className={classes.popoverHeader}>
            Map Options
          </Typography>
          <List>
            <ListItem onClick={() => setMapThemeDialogOpen(true)} button>
              <ListItemIcon>
                <ThemeIcon className={classes.themeIcon} />
              </ListItemIcon>
              <ListItemText primary="Map Theme" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Checkbox checked={false} />
              </ListItemIcon>
              <ListItemText primary="Public Places" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Checkbox checked={false} />
              </ListItemIcon>
              <ListItemText primary="My Places" />
            </ListItem>
          </List>
        </Popover>
        <MapThemeDialog setAnchorEl={setAnchorEl} />
      </>
    );
  };

  return (
    <div className={classes.btnGroup}>
      <Tooltip title="Options">
        <Button
          variant="contained"
          className={classes.mapBtn}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <OptionsIcon />
        </Button>
      </Tooltip>
      <OptionsPopover />
      <Tooltip title="My Location">
        <Button
          variant="contained"
          className={classes.mapBtn}
          onClick={() => setCurrentUserPosition(data.viewport)}
        >
          <LocationIcon />
        </Button>
      </Tooltip>
    </div>
  );
};

MapButtons.propTypes = {
  data: PropTypes.object.isRequired,
  setCurrentUserPosition: PropTypes.func.isRequired,
  setMapThemeDialogOpen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  setCurrentUserPosition,
  setMapThemeDialogOpen,
};

export default connect(mapStateToProps, mapActionsToProps)(MapButtons);
