import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from '../../utils/axios'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchSubcategories } from '../../Stoere/Action';

function Category() {
  

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [subCategories, setSubCategories] = useState('');
  
  const categories = useSelector((state) => state.categories.categories);
 const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  

    const handleChange = async (event) => {
      const categoryID = event.target.value;
      setSelectedCategory(categoryID);
     
      setSelectedSubCategory('')
      await SubCategory(categoryID); 
    };

 

    const handleSubCategoryChange = (event) => {
      const subCategoryID = event.target.value;
      setSelectedSubCategory(subCategoryID);
    };
  

    const SubCategory = async (categoryID) => {
      try {
        const res = await axios.get(`category/subCategory/${categoryID}`);
        if(res.data){
          setSubCategories(res?.data);
        }
        
       
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleCategorySubmit = async () => {
      try {
        const res = await axios.post('category/create', {
          name: newCategoryName,
          parentId: selectedSubCategory || selectedCategory,
        });
        setSuccessMessage('Category added successfully.');
        setErrorMessage('');
        setNewCategoryName('')
        setSelectedCategory('')
        setSelectedSubCategory('');
        setSubCategories([])
       
      } catch (error) {
        setErrorMessage('Error adding category. Please try again.');
        setSuccessMessage('');
      }
    };
   
  return (
    <div>
        <Typography variant="h6" sx={{ marginTop:20}} component="h1" >
          Add Category
        </Typography>
    <FormControl variant="standard" sx={{ m: 4, minWidth: 200 }}>
    
      <InputLabel id="demo-simple-select-standard-label">Select Parent category</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={selectedCategory}
        onChange={handleChange}
        label="Parent category"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {subCategories.map((subCategory) => (
              <MenuItem key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Add new Category"  variant="outlined" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)}/>
      
    </Box>
    <Stack spacing={2} sx={{ justifyContent:"center" }} direction="row">
    
      <Button variant="contained" onClick={handleCategorySubmit}>Save</Button>
      
    </Stack>
    {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
  </div>
  )
}

export default Category