import React from 'react';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

export default class Query extends React.Component {


  render() {
    const { start_date, end_date, locations, location_list } = this.props;

    handleChange(e){
      
    }

    return (
      <div>
        <FormControl>
          <InputLabel id="location">Location</InputLabel>
          <Select
            labelId="location"
            id="location"
            multiple
            value={selected_location}
            onChange={handleChange}
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
