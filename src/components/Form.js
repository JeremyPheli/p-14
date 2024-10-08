import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Stack, Select, MenuItem } from "@mui/material";
import DatePicker from "react-datepicker";
import { states } from "../data/DataForm";
import "react-datepicker/dist/react-datepicker.css";
import { addEmployee } from "../employeeSlice";
import CustomModal from "react-modal-lib-jeremypheli";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Street, setStreet] = useState("");
  const [City, setCity] = useState("");
  const [Zip, setZip] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : null,
      startDate: startDate ? startDate.toISOString() : null,
      Street,
      City,
      selectedState,
      Zip,
    };
    dispatch(addEmployee(formData));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      Street &&
      City &&
      selectedState &&
      Zip &&
      startDate &&
      dateOfBirth
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    firstName,
    lastName,
    Street,
    City,
    selectedState,
    Zip,
    startDate,
    dateOfBirth,
  ]);

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
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
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
            placeholderText="Start Date"
            className="customDatePicker"
          />
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            placeholderText="Date of Birth"
            className="customDatePicker"
          />
        </Stack>

        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <h3 style={{ marginBottom: 0, marginTop: 30 }}>Address</h3>
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

        <Button
          style={{ marginTop: 10 }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </form>

      <CustomModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        message="L'employé a bien été créé"
      />
    </Box>
  );
};

export default Form;
