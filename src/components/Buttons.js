import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export default function Buttons({ categories }) {
  const to = item => `/main/${item.id}`
  return (
    <div>
      {categories.map(item => (
        <Button component={Link} style={{ marginLeft : 20 }} variant="contained" color="tertiary" to={to(item)}>
            {item.name}
        </Button>
      ))}
    </div>
  );
}
