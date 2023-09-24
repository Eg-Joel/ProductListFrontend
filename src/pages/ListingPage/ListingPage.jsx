import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchSubcategories } from "../../Stoere/Action";
import {
  fetchAllProducts,
  fetchProductCounts,
  fetchProductsByCategory,
} from "../../components/Products/Product";

function ListingPage() {
  const categories = useSelector((state) => state.categories.categories);

  const subcategories = useSelector(
    (state) => state.subcategories.subcategories
  );
  const productsByCategory = useSelector(
    (state) => state.products.productsByCategory
  );
  const products = useSelector((state) => state.products.allProducts);
  // const productCounts = useSelector((state) => state.products?.productCounts);
  const dispatch = useDispatch();

  const firstCategoryId = categories[0]?._id;
  const [categoryId, setCategoryId] = useState(firstCategoryId);
  // useEffect(() => {
  // if(categoryId){
  //   dispatch(fetchProductCounts(categoryId));

  // }

  // }, [dispatch, categoryId]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllProducts());
  }, [dispatch, categories]);
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSubcategories(categoryId));
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    dispatch(fetchSubcategories(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [dispatch, categoryId]);

  const handleSubcategoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  const preventDefault = (event) => event.preventDefault();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          {categories.map((category) => (
            <div key={category._id}>
              <span>{category.name}</span>
            </div>
          ))}
          <Typography
            variant="h5"
            component="h1"
            sx={{ textAlign: "left", marginTop: "10px" }}
          >
            Subcategories
          </Typography>
          <Box
            sx={{
              typography: "body1",
              padding: "20px",
              textAlign: "left",
              display: "flex",
            }}
            onClick={preventDefault}
          >
            {subcategories.map((subcategory) => (
              <div key={subcategory._id}>
                <Button
                  size="large"
                  onClick={() => handleSubcategoryClick(subcategory._id)}
                >
                  {subcategory.name}
                </Button>
              </div>
            ))}
          </Box>

          <Typography
            variant="h6"
            component="h1"
            sx={{ textAlign: "left", marginTop: "10px" }}
          >
            Products
          </Typography>
          <Box sx={{ width: "30%" }}>
            <Stack spacing={2}>
              {productsByCategory[categoryId]
                ? productsByCategory[categoryId].map((product) => (
                    <Item key={product._id}>{product.name}</Item>
                  ))
                : products.map((product) => (
                    <Item key={product._id}>{product.name}</Item>
                  ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default ListingPage;
