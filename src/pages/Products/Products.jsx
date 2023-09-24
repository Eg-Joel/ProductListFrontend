import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem'; 
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import axios from '../../utils/axios'
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../Stoere/Action';

function Products() {
 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [subCategories, setSubCategories] = useState('');
  const [subCategoriesName, setSubCategoriesName] = useState('');
  

  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  const handleChange = async (event) => {
    const categoryID = event.target.value;
    setSelectedCategory(categoryID);
  
    await SubCategory(categoryID); 
  };

  const handleSubCategoryChange = async (event) => {
    const subCategoryID = event.target.value;
    setSelectedSubCategory(subCategoryID);

    

    await SubCategory( subCategoryID);
  };

  const SubCategory = async (categoryID) => {
    try {
      const res = await axios.get(`category/subCategory/${categoryID}`);
      if(res.data){
        setSubCategories(res?.data);
        getSubCategoryName(categoryID) 
      }
     
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function getSubCategoryName(subCategoryId) {
    const selectedSubCategoryObj = subCategories.find(subCategory => subCategory._id === subCategoryId);
    
    console.log(selectedSubCategoryObj?.name);
    setSubCategoriesName(selectedSubCategoryObj?.name)
  }
  
  const handleAddProduct = async () =>{
try {
 
  const res = await axios.post('product/addProduct', {
    name: productName,
    categoryId: selectedSubCategory
   
  });

  setProductName('')
  setSelectedCategory('')
  setSelectedSubCategory('')
  getSubCategoryName('')
  setSubCategories('')
  if (res.status === 201) {
    setSuccessMessage('Product added successfully.');
    setErrorMessage('');
  } else {
    setSuccessMessage('');
    setErrorMessage('Failed to add the product.');
  }
} catch (error) {
  setSuccessMessage('');
  console.error('Error:', error);
  setErrorMessage('Internal server error. Please try again later.');
}
  }
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc',marginTop:10 , height: '60vh',}} >
      <Stack spacing={2} sx={{m:3, width: 300 }}>
        <TextField id="outlined-basic" label="Product Name" variant="outlined" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <FormControl variant="standard" sx={{ m: 4, minWidth: 200 }}>
    
    <InputLabel id="demo-simple-select-standard-label">Select Parent category</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={selectedCategory}
      onChange={handleChange}
      label="Parent category"
    >
      
      {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
    </Select>
  </FormControl>
  {subCategories.length > 0 && (
      <FormControl variant="standard" sx={{ m: 4, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-subcategory-label">Select Subcategory</InputLabel>
        <Select
          labelId="demo-simple-select-subcategory-label"
          id="demo-simple-select-subcategory"
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
          label="Subcategory"
        >
          
          {subCategories.map((subCategory) => (
            <MenuItem key={subCategory._id} value={subCategory._id}>
              {subCategory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  
{subCategoriesName && (
  <Typography variant="h6" sx={{ marginTop: 20 }} component="h1">
    Subcategory Name: {subCategoriesName}
  </Typography>
)}
       <Button variant="contained" onClick={handleAddProduct}>ADd</Button>
    </Stack>
    {successMessage && (
  <Typography variant="h6" sx={{ marginTop: 20, color: 'green' }} component="h1">
    {successMessage}
  </Typography>
)}

{errorMessage && (
  <Typography variant="h6" sx={{ marginTop: 20, color: 'red' }} component="h1">
    {errorMessage}
  </Typography>
)}
    </Box>
    </Container>
  </React.Fragment>
  )
}

export default Products