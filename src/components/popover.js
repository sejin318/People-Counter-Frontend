import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function MouseOverPopover(props) {
  const classes = useStyles();
  const handlePopoverOpen = (event) => {
    props.setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    props.setAnchorEl(null);
  };

  const open = Boolean(props.anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        display='inline'
      >
      <b>Privacy Info</b>
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={props.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>For privacy protection of the subject of the camera view, we only display the picture without people.</Typography>
      </Popover>
    </div>
  );
}
