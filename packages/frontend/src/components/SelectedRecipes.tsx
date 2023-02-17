import { Recipe } from "../data/RecipeStore";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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
            <Item>{selected.name}</Item>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => props.onDelete(selected)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        );
      })}
    </Grid>
  );
}
