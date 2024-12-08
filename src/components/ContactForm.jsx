import React from 'react';
import { TextField, Button, FormControl, FormLabel, Checkbox, FormGroup, FormControlLabel, Box } from '@mui/material';

const ContactForm = ({ onClose }) => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 3,
        backgroundColor: 'var(--primary-color)',
        color: 'var(--secondary-color)',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '96%',
        textAlign: 'center',
      }}
    >
      <FormControl>
        <FormLabel>Event Location</FormLabel>
        <TextField required fullWidth variant="outlined" />
      </FormControl>
      <FormControl>
        <FormLabel>City</FormLabel>
        <TextField required fullWidth variant="outlined" />
      </FormControl>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <TextField required fullWidth type="date" InputLabelProps={{ shrink: true }} />
      </FormControl>
      <FormControl>
        <FormLabel>Contact Person</FormLabel>
        <TextField required fullWidth variant="outlined" />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <TextField required fullWidth type="email" variant="outlined" />
      </FormControl>
      <FormControl>
        <FormLabel>Cell</FormLabel>
        <TextField fullWidth type="tel" variant="outlined" />
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel>Music Style</FormLabel>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Disco" />
          <FormControlLabel control={<Checkbox />} label="Funk" />
          <FormControlLabel control={<Checkbox />} label="House" />
          <FormControlLabel control={<Checkbox />} label="Other" />
        </FormGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Additional Information</FormLabel>
        <TextField fullWidth multiline rows={4} placeholder="Write any additional details here..." inputProps={{ maxLength: 250 }} />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--primary-color)',
          '&:hover': { backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' },
        }}
        fullWidth
      >
        Submit
      </Button>
      <Button
        onClick={onClose}
        variant="outlined"
        sx={{
          marginTop: 1,
          color: 'var(--secondary-color)',
          borderColor: 'var(--secondary-color)',
          '&:hover': { backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' },
        }}
        fullWidth
      >
        Close
      </Button>
    </Box>
  );
};

export default ContactForm;
