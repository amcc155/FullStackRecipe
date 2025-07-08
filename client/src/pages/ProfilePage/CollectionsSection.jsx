import {
  Grid,
  Button,
  Container,
  CardHeader,
  CardMedia,
  Card,
} from "@mui/material";
import AddNewCollectionModal from "../../components/AddNewCollectionModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const CollectionsSections = ({ latestData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(latestData);
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Container sx={{ position: "relative", mt: 3 }}>
      <AddNewCollectionModal
        handleClose={handleClose}
        isModalOpen={isModalOpen}
      />
      <Button
        onClick={handleOpen}
        sx={{
          width: "fit-content",
          minHeight: "2.75rem",
          position: "absolute",
          right: 0,
          top: -9,
        }}
      >
        Create New Collection
      </Button>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {latestData?.map((collection) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={collection.id}
            sx={{ mt: 5 }}
          >
            <Card sx={{ height: "100%" }}>
              <CardHeader
                component={Link}
                to={`/collections/${
                  collection.id
                }?collectionName=${encodeURIComponent(collection.name)}`}
                title={collection.name}
                sx={{ textAlign: "center" }}
                subheader={`${collection.countrecipes} recipes`}
              />

              <CardMedia
                component="img"
                image={collection.previewimages?.[0]}
                sx={{ height: "200px", objectFit: "cover" }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CollectionsSections;
