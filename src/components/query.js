import React from 'react';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

export default class Query extends React.Component {

  handleChange(e){

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
        <FormControl>
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
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>
              {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}
