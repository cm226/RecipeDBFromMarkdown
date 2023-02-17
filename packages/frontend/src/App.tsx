import * as React from "react";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import "./App.css";
import { Recipe, RecipeStore } from "./data/RecipeStore";
import { RecipePicker } from "./components/RecipePicker";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { SelectedRecipes } from "./components/SelectedRecipes";
import { AddExtra } from "./components/AddExtra";
import { Ingredient, ShoppingList } from "./components/ShoppingList";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const store = new RecipeStore();
store.populate();

function App() {
  const [open, setOpen] = React.useState(false);
  const [shoppingList, setList] = React.useState([] as Ingredient[]);
  const [selectedRecipes, setRecipeList] = React.useState([] as Recipe[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (recipe: Recipe | null) => {
    setOpen(false);
    if (recipe === null) return;

    recipe.ingreds.forEach((ingred) =>
      shoppingList.push({ name: ingred, recipe: recipe.name })
    );
    selectedRecipes.push(recipe);
  };

  const handleDelete = (r: Recipe) => {
    setRecipeList(selectedRecipes.filter((selected) => selected !== r));
    setList(shoppingList.filter((item) => item.recipe !== r.name));
  };
  const extraAdded = (extra: string) => {
    setList([...shoppingList, { name: extra, recipe: "extra" }]);
  };
  const handleDeleteFromList = (ingred: Ingredient) => {
    setList(shoppingList.filter((item) => item !== ingred));
  };

  return (
    <div className="App">
      <Button variant="outlined" onClick={handleClickOpen}>
        Choose Recipe
      </Button>
      <AddExtra onNewItem={extraAdded}></AddExtra>
      <RecipePicker store={store} open={open} onClose={handleClose} />

      <Container maxWidth="sm">
        <SelectedRecipes
          selectedRecipes={selectedRecipes}
          onDelete={handleDelete}
        ></SelectedRecipes>
        <ShoppingList
          shoppingList={shoppingList}
          onDelete={handleDeleteFromList}
        ></ShoppingList>
      </Container>
    </div>
  );
}

export default App;
