import * as React from "react";

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

export interface SelectableListItemProps {
  value: Ingredient;
  checked: boolean;
  check: () => void;
  onDelete: (r: Ingredient) => void;
}

export function SelectableListItem(props: SelectableListItemProps) {
  const value = props.value;
  const labelId = `checkbox-list-label-${value.name}`;
  return (
    <ListItem key={`${value.name}_${value.recipe}`} disablePadding>
      <ListItemButton role={undefined} onClick={() => props.check()} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={props.checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />{" "}
        </ListItemIcon>{" "}
        <ListItemText
          id={labelId}
          primary={`${value.name}`}
          secondary={`${value.recipe}`}
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
}

export interface ListItemsProps {
  checked: Map<string, boolean>;
  showChecked: boolean;
  shoppingList: Ingredient[];
  onDelete: (r: Ingredient) => void;
  onCheck: (name: string) => void;
}

export function ListItems(props: ListItemsProps) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.shoppingList.map((value) => {
        if ((props.checked.get(value.name) ?? false) === props.showChecked)
          return (
            <SelectableListItem
              value={value}
              onDelete={props.onDelete}
              checked={props.checked.get(value.name) ?? false}
              check={() => props.onCheck(value.name)}
            ></SelectableListItem>
          );
      })}
    </List>
  );
}

export function ShoppingList(props: SelectedRecipesProps) {
  const [checked, setChecked] = React.useState(new Map<string, boolean>());
  return (
    <div>
      <ListItems
        checked={checked}
        shoppingList={props.shoppingList}
        showChecked={false}
        onDelete={props.onDelete}
        onCheck={(name) => {
          checked.set(name, !(checked.get(name) ?? false));
          setChecked(new Map(checked));
        }}
      ></ListItems>
      <ListItems
        checked={checked}
        shoppingList={props.shoppingList}
        showChecked={true}
        onDelete={props.onDelete}
        onCheck={(name) => {
          checked.set(name, !(checked.get(name) ?? false));
          setChecked(new Map(checked));
        }}
      ></ListItems>
    </div>
  );
}
