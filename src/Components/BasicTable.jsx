import * as React from 'react';
import { useLocation } from "react-router-dom";
import './BasicTable.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function BasicTable({ data }) {
    console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Showtime and Date</TableCell>
            <TableCell align="right">Movie</TableCell>
            <TableCell align="right">Showroom</TableCell>
            <TableCell align="right">Seats</TableCell>
            <TableCell align="right">Order Total</TableCell>
            <TableCell align="right">Booking Number</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((booking) => (
            <TableRow
                key={booking._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {booking.showDateAndTime}
              </TableCell>
              <TableCell align="right">{booking.movieTitle}</TableCell>
              <TableCell align="right">{booking.showRoom}</TableCell>
              <TableCell align="right">{booking.seats}</TableCell>
              <TableCell align="right">${booking.finalPrice}</TableCell>
              <TableCell align="right">{booking._id.substring(14)}</TableCell>
            </TableRow>
          ))}

        
        </TableBody>
      </Table>
    </TableContainer>
  );
}