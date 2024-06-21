import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Grid,
} from "@mui/material";

export default function DrugDetails() {
  const { id } = useParams();
  const [drug, setDrug] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const response = await fetch(
          `https://api.fda.gov/drug/ndc.json?search=generic_name:${id}`
        );
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        const data = await response.json();
        setDrug(data.results[0]);
      } catch (error) {
        console.error("Error al obtener los detalles del medicamento", error);
        setDrug(null);
        setError(true);
      }
    };

    fetchDrug();
  }, [id]);

  if (!drug) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          marginBlock: "30px",
          borderRadius: "8px",
          maxWidth: "800px",
          marginInline: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Container
          sx={{
            textAlign: "center",
            height: "8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            component="h1"
            letterSpacing={2}
          >
            {drug.generic_name}
          </Typography>
        </Container>

        <Link
          to="/"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <ArrowBackIcon color="primary" fontSize="large" />
        </Link>

        <Container sx={{ backgroundColor: "white.main", borderRadius: "8px" }}>
          {error ? (
            <Typography variant="h6" mt={2}>
              No existe información sobre este medicamento
            </Typography>
          ) : (
            <Grid container>
              <Grid item xs={12} sm={6}>
                <List>
                  {drug.brand_name && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Brand Name
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.brand_name}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.product_ndc && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Product NDC
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.product_ndc}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.labeler_name && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Labeler Name
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.labeler_name}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.active_ingredients?.length > 0 && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Active Ingredients
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.active_ingredients
                              .map(
                                (ingredient) =>
                                  `${ingredient.name} (${ingredient.strength})`
                              )
                              .join(", ")}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.route?.length > 0 && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Route
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.route.join(", ")}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.marketing_start_date && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Marketing Start Date
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.marketing_start_date}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.marketing_category && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Marketing Category
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.marketing_category}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.application_number && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Application Number
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.application_number}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                </List>
              </Grid>
              <Grid item xs={12} sm={6}>
                <List>
                  {drug.dosage_form && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Dosage Form
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.dosage_form}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.product_type && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Product Type
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.product_type}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.openfda?.manufacturer_name?.length > 0 && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Manufacturer Name
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.openfda.manufacturer_name.join(", ")}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.openfda?.upc?.length > 0 && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            UPC
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.openfda.upc.join(", ")}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.openfda?.unii?.length > 0 && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            UNII
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.openfda.unii.join(", ")}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.openfda?.rxcui?.length > 0 && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            RxCUI
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.openfda.rxcui.join(", ")}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {drug.listing_expiration_date && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Listing Expiration Date
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="gray.main">
                            {drug.listing_expiration_date}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Grid>
          )}
        </Container>
      </Paper>
    </Container>
  );
}

{
  /* <Grid container>
  <Grid item xs={12} sm={6}>
    <List>
      <ListItem>
        <ListItemText
          primary="Brand Name"
          secondary={drug.brand_name || "No disponible"}
        />
      </ListItem>
      <ListItem>
        <ListItemText primary="Product NDC" secondary={drug.product_ndc} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Labeler Name"
          secondary={drug.labeler_name || "No disponible"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Active Ingredients"
          secondary={
            drug.active_ingredients
              .map(
                (ingredient) => `${ingredient.name} (${ingredient.strength})`
              )
              .join(", ") || "No disponible"
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Route"
          secondary={drug.route.join(", ") || "No disponible"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Marketing Start Date"
          secondary={drug.marketing_start_date || "No disponible"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Marketing Category"
          secondary={drug.marketing_category || "No disponible"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Application Number"
          secondary={drug.application_number || "No disponible"}
        />
      </ListItem>
    </List>
  </Grid>
  <Grid item xs={12} sm={6}>
    <List>
      <ListItem>
        <ListItemText
          primary="Dosage Form"
          secondary={drug.dosage_form || "No disponible"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Product Type"
          secondary={drug.product_type || "No disponible"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Manufacturer Name"
          secondary={
            drug.openfda?.manufacturer_name?.join(", ") || "No disponible"
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="UPC"
          secondary={drug.openfda?.upc?.join(", ") || "No disponible"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="UNII"
          secondary={drug.openfda?.unii?.join(", ") || "No disponible"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="RxCUI"
          secondary={drug.openfda?.rxcui?.join(", ") || "No disponible"}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Listing Expiration Date"
          secondary={drug.listing_expiration_date || "No disponible"}
        />
      </ListItem>
    </List>
  </Grid>
</Grid>; */
}
