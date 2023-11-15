import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function ActionAreaCard(props) {
    const { children } = props;

  return (
    <Card sx={{  minWidth: '60vw'}}>
        <CardContent>
          {children}
        </CardContent>
    </Card>
  );
}