import React from "react";
import Button from "@mui/material/Button";
import "../styles/index.css";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <header className="masthead">
      <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <h1 className="mx-auto my-0 text-primary">
              Ροδινός Πέτρος project ESHOP
            </h1>
            <h2 className=" mx-auto mt-2 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              interdum quam odio, quis placerat ante luctus eu. Sed aliquet
              dolor id sapien rutrum, id vulputate quam iaculis. Suspendisse
              consectetur mi id libero fringilla, in pharetra sem ullamcorper.
            </h2>
            <Button
              size="large"
              variant="contained"
              endIcon={<LocalGroceryStoreOutlinedIcon />}
              onClick={() => {
                navigate("/Mobile-Phones");
              }}
            >
              start shopping
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomePage;
