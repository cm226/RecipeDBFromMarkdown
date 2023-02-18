import * as React from "react";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import { RecipeStore } from "./data/RecipeStore";
import { RecipePicker } from "./components/RecipePicker";

import { SelectedRecipes } from "./components/SelectedRecipes";
import { AddExtra } from "./components/AddExtra";
import { ShoppingList } from "./components/ShoppingList";
import { ShoppingListRemoter } from "./data/ShoppingListRemoter";
import { Recipe, Ingredient } from "@shopping/types";

const listGetter = new ShoppingListRemoter();

interface props {
  store: RecipeStore;
}

function App(props: props) {
  const [open, setOpen] = React.useState(false);
  const [shoppingDownloaded, setDownloaded] = React.useState(false);
  const [shoppingList, setList] = React.useState([] as Ingredient[]);
  const [selectedRecipes, setRecipeList] = React.useState([] as Recipe[]);

  React.useEffect(() => {
    listGetter.get().then((state) => {
      if (state) {
        setList(state.ingredients);
        setRecipeList(state.recipes);
      }
      setDownloaded(true);
    });
  }, []);

  if (shoppingDownloaded) {
    listGetter
      .set({
        ingredients: shoppingList,
        recipes: selectedRecipes,
      })
      .catch(() => {});
  }

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

  const selected = (
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
  );

  const waitingForDownload = <CircularProgress />;

  return (
    <div className="App">
      <Button variant="outlined" onClick={handleClickOpen}>
        Choose Recipe2
      </Button>
      <AddExtra onNewItem={extraAdded}></AddExtra>
      <RecipePicker store={props.store} open={open} onClose={handleClose} />
      {shoppingDownloaded ? selected : waitingForDownload}
    </div>
  );
}

export default App;
