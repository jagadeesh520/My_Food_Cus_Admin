import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const VendorRequest = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: {
      houseNo: "",
      streetName: "",
      landMark: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const [showAlert, setShowAlert] = useState(null);

  const handleOnchange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleAddress = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      address: {
        ...data.address,
        [e.target.name]: value,
      },
    });
  };

  const onSubmit = () => {
    //APi Call
    console.log("data", data);

    setShowAlert(true);
  };

  const onCancel = () => {
    setShowAlert(false);
    return;
  };

  return (
    <div>
      {showAlert && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success Alert with an encouraging title.
        </Alert>
      )}
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 5, width: "55ch" } }}
        noValidate
        autoComplete="on"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            name="firstName"
            label="First Name"
            onChange={handleOnchange}
            variant="standard"
          />
          <TextField
            required
            id="outlined-required"
            name="lastName"
            label="Last Name"
            onChange={handleOnchange}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            name="email"
            label="Email"
            onChange={handleOnchange}
            variant="standard"
          />
          <TextField
            required
            id="outlined-required"
            name="phoneNumber"
            label="Phone Number"
            type="number"
            onChange={handleOnchange}
            defaultValue="Phone Number"
            variant="standard"
          />
        </div>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 2, width: "37.5ch" } }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="House No"
              name="houseNo"
              onChange={handleAddress}
              variant="standard"
            />
            <TextField
              required
              id="outlined-required"
              label="Street Name"
              name="streetName"
              onChange={handleAddress}
              variant="standard"
            />
            <TextField
              required
              id="outlined-required"
              label="Land Mark"
              name="landMark"
              onChange={handleAddress}
              variant="standard"
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="State"
              name="state"
              onChange={handleAddress}
              variant="standard"
            />
            <TextField
              required
              id="outlined-required"
              label="Pincode"
              name="pincode"
              onChange={handleAddress}
              variant="standard"
            />
            <TextField
              required
              id="outlined-required"
              label="Country"
              name="country"
              onChange={handleAddress}
              variant="standard"
            />
          </div>

          <div className="req-button">
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={onSubmit}>
                Submit
              </Button>
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
            </Stack>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default VendorRequest;
