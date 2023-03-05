import { Recipe } from "@shopping/types";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

export interface SelectedRecipesProps {
  selectedRecipes: Recipe[];
  onDelete: (r: Recipe) => void;
}

export function SelectedRecipes(props: SelectedRecipesProps) {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "primary.main",
        color: "textForeground.main",
        borderRadius: "16px",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: "2px",
        boxShadow: 10,
        padding: "20px",
      }}
    >
      {props.selectedRecipes.map((selected) => {
        return (
          <Grid key={selected.name} item xs>
            <Chip
              label={selected.name}
              variant="outlined"
              onDelete={() => props.onDelete(selected)}
              sx={{ color: "textForeground.main" }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
