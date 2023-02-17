import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Recipe, RecipeStore } from "../data/RecipeStore";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export interface SimpleDialogProps {
  open: boolean;
  store: RecipeStore;
  onClose: (value: Recipe | null) => void;
}

export function RecipePicker(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose(null);
  };

  const handleListItemClick = (value: Recipe) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set a recipe</DialogTitle>
      <List sx={{ pt: 0 }}>
        {props.store.Recipes.map((recipe) => (
          <ListItem disableGutters key={recipe.name}>
            <ListItemButton
              onClick={() => handleListItemClick(recipe)}
              key={recipe.name}
            >
              <ListItemText primary={recipe.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
