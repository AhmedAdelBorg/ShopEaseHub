import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import { useGetproductByNameQuery } from "../../Redux/product";

function Main() {
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setmyDate(newValue);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const allProductsAPI = "products";
  const menCategoryAPI = "products/category/men's clothing";
  const womenCategoryAPI = "products/category/women's clothing";
  const jeweleryCategoryAPI = "products/category/jewelery";
  const electronicsCategoryAPI = "products/category/electronics";
  const [myDate, setmyDate] = useState(allProductsAPI);
  const { data, error, isLoading } = useGetproductByNameQuery(myDate);

  if (isLoading) {
    return <Typography variant="h6">LOADING..............</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6">
        {" "}
        {
          // @ts-ignore
          error.message
        }
      </Typography>
    );
  }
  if (data) {
    return (
      <Container sx={{ py: 9 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Box>
            <Typography variant="h6">Selected Products</Typography>
            <Typography fontWeight={300} variant="body1">
              All our new arrivals in a exclusive brand selection
            </Typography>
          </Box>

          <ToggleButtonGroup
            color="primary"
            value={myDate}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              sx={{
                color: theme.palette.text.primary,
                textTransform: "capitalize",
              }}
              value={allProductsAPI}
            >
              All Products
            </ToggleButton>
            <ToggleButton
              sx={{
                color: theme.palette.text.primary,
                textTransform: "capitalize",
              }}
              value={menCategoryAPI}
            >
              {" "}
              MEN 
            </ToggleButton>
            <ToggleButton
              sx={{
                color: theme.palette.text.primary,
                textTransform: "capitalize",
              }}
              value={womenCategoryAPI}
            >
              Women
            </ToggleButton>
            <ToggleButton
              sx={{
                color: theme.palette.text.primary,
                textTransform: "capitalize",
              }}
              value={electronicsCategoryAPI}
            >
              {" "}
              electronics
            </ToggleButton>
            <ToggleButton
              sx={{
                color: theme.palette.text.primary,
                textTransform: "capitalize",
              }}
              value={jeweleryCategoryAPI}
            >
              {" "}
              jewelery
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {data.map((item) => {
            return (
              <Card
                key={item}
                sx={{
                  maxWidth: 333,
                  mt: 6,
                  ":hover .MuiCardMedia-root ": {
                    rotate: "1deg",
                    scale: "1.1",
                    transition: "0.35s",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 277 }}
                  // @ts-ignore
                  image={item.image}
                  title="green iguana"
                />
                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title.slice(0, 20)}...
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      {item.price}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {item.description.slice(0, 150)}...
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    onClick={handleClickOpen}
                    sx={{ textTransform: "capitalize" }}
                    size="large"
                  >
                    <AddShoppingCartOutlinedIcon
                      sx={{ mr: 1 }}
                      fontSize="small"
                    />
                    add to cart
                  </Button>
                  <Rating
                    name="read-only"
                    precision={0.1}
                    value={item.rating.rate}
                    readOnly
                  />
                </CardActions>
              </Card>
            );
          })}
        </Stack>

        <Dialog
          sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            sx={{
              ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
              position: "absolute",
              top: 0,
              right: 10,
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <ProductDetails />
        </Dialog>
      </Container>
    );
  }
}

export default Main;
