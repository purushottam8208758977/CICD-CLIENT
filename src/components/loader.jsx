import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IosRefresh from 'react-ionicons/lib/IosRefresh'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function CircularIndeterminate(props) {
  return (
    <div id="LoaderCircle">
      {/* <CircularProgress className={classes.progress} /> */}
      <IosRefresh fontSize="40px" color="rgb(60, 64, 67)" rotate={true} />

    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
