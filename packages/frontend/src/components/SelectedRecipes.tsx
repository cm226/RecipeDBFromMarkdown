import { Recipe } from "@shopping/types";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

export interface SelectedRecipesProps {
  selectedRecipes: Recipe[];
  onDelete: (r: Recipe) => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function SelectedRecipes(props: SelectedRecipesProps) {
  return (
    <Grid container spacing={3}>
      {props.selectedRecipes.map((selected) => {
        return (
          <Grid key={selected.name} item xs>
            <Chip
              label={selected.name}
              variant="outlined"
              onDelete={() => props.onDelete(selected)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
