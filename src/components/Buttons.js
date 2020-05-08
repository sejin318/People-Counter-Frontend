import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


export default function Buttons({ categories }) {
  const to = item => `/main/${item.id}`
  const button_list = isBrowser? categories : categories.slice(0, 3);
  return (
    <div>
      {button_list.map(item => (
        <Button component={Link} style={{ marginLeft : isBrowser ? 20 : 0 }} variant="contained" raised color="tertiary" to={to(item)}>
            {item.name}
        </Button>
      ))}
    </div>
  );
}
