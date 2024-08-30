import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import { Stack, Typography } from "@mui/material";

// TAILWIND + FAKEDATA + GESTION DU FORMULAIRE

const Home = () => {
  return (
    <Stack alignItems={"center"}>
      <div>
        <Typography fontSize={44}>HRnet</Typography>
        <Link
          role="button"
          to="/employees"
          style={{
            textDecoration: "none",
            fontSize: 16,
          }}
        >
          {" "}
          View Current Employees
        </Link>
      </div>
      <Typography fontSize={24} mt={5}>
        Create Employee
      </Typography>
      <Form />
    </Stack>
  );
};

export default Home;
