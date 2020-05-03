import React from 'react';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { set_locations } from  '../actions/query';
// import { makeStyles, useTheme } from '@material-ui/core/styles';

const styles = {
  formControl: {
    margin: 1,
    minWidth: 120,
    maxWidth: 300,
  },
  // chips: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  // chip: {
  //   margin: 2,
  // },
  // noLabel: {
  //   marginTop: theme.spacing(3),
  // },
};

export default class Query extends React.Component {

  const handleChange = (e) => {
    const { dispatch } = this.props;
    dispatch(set_locations(e.target.value[0]));
  }

  render() {
    const { start_date, end_date, locations, location_list } = this.props;

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    return (
      <div>
        <h1>Query & Download From the Database</h1>
        <div>
          <FormControl style={styles.formControl}>
            <InputLabel id="location">Location</InputLabel>
            <Select
              labelId="location"
              id="location"
              multiple
              value={locations}
              onChange={this.handleChange}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {location_list.map((loc) => (
                <MenuItem key={loc} value={loc} style={styles.formControl}>
                {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}
