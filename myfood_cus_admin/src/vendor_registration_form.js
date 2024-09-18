import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box, Grid, Switch } from '@mui/material';

const VendorForm = () => {
  const [vendorData, setVendorData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    contact_no: '',
    country: '', 
    house_no: '', 
    landmark: '', 
    pincode: '', 
    state: '', 
    street_name: '', 
    current_Add_Location: '',
    add_Proof_Name: '',
    add_proof_att: null,
  });
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setVendorData({ ...vendorData, [name]: files[0] });
  };

  const handleItemChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = files ? files[0] : value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { title: '', cost: '', image: null, available: true, message: 'Item is available' }]);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const toggleItemAvailability = (index) => {
    const updatedItems = [...items];
    updatedItems[index].available = !updatedItems[index].available;
    updatedItems[index].message = updatedItems[index].available ? 'Item is available' : 'Item is not available';
    setItems(updatedItems);
  };

  const validateUniqueTitles = () => {
    const titles = items.map(item => item.title.trim().toLowerCase());
    const uniqueTitles = new Set(titles);
    return titles.length === uniqueTitles.size;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vendorData.country || !vendorData.house_no || !vendorData.landmark || !vendorData.pincode) {
      setError('Complete address must be provided.');
      return;
    }

    if (!validateUniqueTitles()) {
      setError('Already Entered Item with this Name.');
      return;
    }

    const personalInfo = {
      firstname: vendorData.firstname,
      lastname: vendorData.lastname,
      email: vendorData.email,
      contact_no: vendorData.contact_no,
    };

    const addressData = {
      country: vendorData.country,
      house_no: vendorData.house_no,
      landmark: vendorData.landmark,
      pincode: vendorData.pincode,
      state: vendorData.state,
      street_name: vendorData.street_name,
      current_Add_Location: vendorData.current_Add_Location,
      add_Proof_Name: vendorData.add_Proof_Name,
      add_proof_att: vendorData.add_proof_att,
    };

    const itemData = items.map(item => ({
      title: item.title,
      cost: item.cost,
      image: item.image,
      available: item.available,
    }));

    console.log('Personal Info:', personalInfo);
    console.log('Address Data:', addressData);
    console.log('Items:', itemData);

    setError('');

    const formData = new FormData();
    formData.append('firstname', vendorData.firstname);
    formData.append('lastname', vendorData.lastname);
    formData.append('email', vendorData.email);
    formData.append('contact_no', vendorData.contact_no);
    formData.append('country', vendorData.country);
    formData.append('house_no', vendorData.house_no);
    formData.append('landmark', vendorData.landmark);
    formData.append('pincode', vendorData.pincode);
    formData.append('state', vendorData.state);
    formData.append('street_name', vendorData.street_name);
    formData.append('current_Add_Location', vendorData.current_Add_Location);
    formData.append('add_Proof_Name', vendorData.add_Proof_Name);
    formData.append('add_proof_att', vendorData.add_proof_att);

    items.forEach((item, index) => {
      formData.append(`items[${index}][title]`, item.title);
      formData.append(`items[${index}][cost]`, item.cost);
      formData.append(`items[${index}][image]`, item.image);
    });

    try {
      const response = await fetch('http://localhost:5000/api/vendors/vendor-registration', {
        method: 'POST',
        body: formData,
      });
      const result = await response.text();
      console.log('Server response:', result);
      alert(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`;
        setVendorData({ ...vendorData, current_Add_Location: location });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Vendor Registration Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          name="firstname"
          variant="outlined"
          margin="normal"
          value={vendorData.firstname}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastname"
          variant="outlined"
          margin="normal"
          value={vendorData.lastname}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="outlined"
          margin="normal"
          value={vendorData.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="Contact Number"
          name="contact_no"
          variant="outlined"
          margin="normal"
          value={vendorData.contact_no}
          onChange={handleInputChange}
          required
        />

        <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>Address</Typography>
        <TextField
          fullWidth
          label="Country"
          name="country"
          variant="outlined"
          margin="normal"
          value={vendorData.country}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="House Number"
          name="house_no"
          variant="outlined"
          margin="normal"
          value={vendorData.house_no}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="Landmark"
          name="landmark"
          variant="outlined"
          margin="normal"
          value={vendorData.landmark}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="Pincode"
          name="pincode"
          variant="outlined"
          margin="normal"
          value={vendorData.pincode}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="State"
          name="state"
          variant="outlined"
          margin="normal"
          value={vendorData.state}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="Street Name"
          name="street_name"
          variant="outlined"
          margin="normal"
          value={vendorData.street_name}
          onChange={handleInputChange}
          required
        />

        <Button variant="contained" onClick={getCurrentLocation} sx={{ marginTop: 2, marginBottom: 2 }}>
          Get Current Location
        </Button>
        <TextField
          fullWidth
          label="Current Address Location"
          name="current_Add_Location"
          variant="outlined"
          margin="normal"
          value={vendorData.current_Add_Location}
          readOnly
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Address Proof</InputLabel>
          <Select
            name="add_Proof_Name"
            value={vendorData.add_Proof_Name}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="">Select Address Proof</MenuItem>
            <MenuItem value="driving license">Driving License</MenuItem>
            <MenuItem value="aadhar card">Aadhar Card</MenuItem>
            <MenuItem value="pan card">PAN Card</MenuItem>
            <MenuItem value="voter id">Voter ID</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {vendorData.add_proof_att ? 'Address Proof Uploaded' : 'Upload Address Proof'}
          <input
            type="file"
            name="add_proof_att"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>Items</Typography>
        {items.map((item, index) => (
          <Box key={index} sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Item Title"
              name="title"
              variant="outlined"
              margin="normal"
              value={item.title}
              onChange={(e) => handleItemChange(index, e)}
              required
            />
            <TextField
              fullWidth
              label="Item Cost"
              name="cost"
              variant="outlined"
              margin="normal"
              value={item.cost}
              onChange={(e) => handleItemChange(index, e)}
              required
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              {item.image ? 'Item Image Uploaded' : 'Upload Item Image'}
              <input
                type="file"
                name="image"
                hidden
                onChange={(e) => handleItemChange(index, e)}
              />
            </Button>

            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Switch
                  checked={item.available}
                  onChange={() => toggleItemAvailability(index)}
                />
              </Grid>
              <Grid item>
                <Typography>{item.message}</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="error" onClick={() => deleteItem(index)}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}

        <Button
          variant="contained"
          onClick={addItem}
          sx={{ marginBottom: 3 }}
        >
          Add Item
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>

        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default VendorForm;
