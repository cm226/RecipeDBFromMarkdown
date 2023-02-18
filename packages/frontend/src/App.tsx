import * as React from "react";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import { RecipeStore } from "./data/RecipeStore";
import { RecipePicker } from "./components/RecipePicker";
import { ThemeProvider, createTheme, makeStyles } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { SelectedRecipes } from "./components/SelectedRecipes";
import { AddExtra } from "./components/AddExtra";
import { ShoppingList } from "./components/ShoppingList";
import { ShoppingListRemoter } from "./data/ShoppingListRemoter";
import { Recipe, Ingredient } from "@shopping/types";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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
      <Divider
        sx={{
          color: "#90caf9",
          "&::before, &::after": {
            borderColor: "#90caf9",
          },
        }}
      >
        Shopping List
      </Divider>
      <ShoppingList
        shoppingList={shoppingList}
        onDelete={handleDeleteFromList}
      ></ShoppingList>
    </Container>
  );

  const waitingForDownload = <CircularProgress />;

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className="App">
        <RecipePicker store={props.store} open={open} onClose={handleClose} />
        {shoppingDownloaded ? selected : waitingForDownload}
        <ThemeProvider theme={darkTheme}>
          <AppBar
            position="fixed"
            color="primary"
            sx={{ top: "auto", bottom: 0 }}
          >
            <Toolbar>
              <IconButton
                color="primary"
                onClick={handleClickOpen}
                size="large"
              >
                <MenuBookIcon />
              </IconButton>
              <AddExtra onNewItem={extraAdded}></AddExtra>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <Toolbar />
      </div>
    </ThemeProvider>
  );
}

export default App;
