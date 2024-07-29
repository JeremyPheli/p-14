import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button, Stack, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import { states } from '../data/DataForm';
import 'react-datepicker/dist/react-datepicker.css';
import { addEmployee } from '../employeeSlice';

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Street, setStreet] = useState("");
  const [City, setCity] = useState("");
  const [Zip, setZip] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [selectedState, setSelectedState] = useState("");

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      Street,
      City,
      selectedState,
      Zip,
    };
    dispatch(addEmployee(formData));
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={6}
      boxShadow={"0px 3px 26px 6px rgba(0,0,0,0.25)"}
      width={"30%"}
      padding={2}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Date of Birth"
            className="custom-date-picker"
          />
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            placeholderText="Start Date"
            className="custom-date-picker"
          />
        </Stack>

        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <h3>Address</h3>
          <TextField
            label="Street"
            value={Street}
            onChange={(e) => setStreet(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="City"
            value={City}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
            fullWidth
          />

          <Select
            labelId="state-select-label"
            fullWidth
            placeholder="States"
            id="state-select"
            value={selectedState}
            label="State"
            onChange={handleChange}
          >
            {states.map((state) => (
              <MenuItem key={state.abbreviation} value={state.name}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Zip"
            value={Zip}
            onChange={(e) => setZip(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Form;
