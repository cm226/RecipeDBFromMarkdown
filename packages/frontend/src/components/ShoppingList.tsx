import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import { Ingredient } from "@shopping/types";

export interface SelectedRecipesProps {
  shoppingList: Ingredient[];
  onDelete: (r: Ingredient) => void;
}

export function ShoppingList(props: SelectedRecipesProps) {
  const handleToggle = (value: string) => () => {};

  return (
    <List sx={{ width: "100%" }}>
      {props.shoppingList.map((value) => {
        const labelId = `checkbox-list-label-${value.name}`;

        return (
          <ListItem key={`${value.name}_${value.recipe}`} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value.name)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={false}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />{" "}
              </ListItemIcon>{" "}
              <ListItemText
                id={labelId}
                primary={`${value.name}`}
                secondary={`${value.recipe}`}
                sx={{
                  color: "textForeground.main",
                }}
              />
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => props.onDelete(value)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
