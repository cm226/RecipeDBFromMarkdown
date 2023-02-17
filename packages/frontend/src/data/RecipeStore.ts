export interface Recipe {
  name: string;
  ingreds: string[];
}

export class RecipeStore {
  public _recipes: Recipe[] = [];

  public get Recipes() {
    return this._recipes;
  }
  populate() {
    const data =
      '[{"name":"Burrito","ingreds":["[ ] Rice","[ ] Black beans","[ ] Avacadoes","[ ] Sour cream","[ ] Cheese","[ ] Haggis","[ ] Wrapps"]},{"name":"CheesyPasta","ingreds":["[ ] Pasta","[ ] Onion","[ ] Pepper","[ ] Garlic","[ ] Cherry tomatoe","[ ] Asparagus","[ ] Cheese","[ ] Butter","[ ] Mushroom","[ ] Artichoke"]},{"name":"Kombucha bluebury and lemmon","ingreds":[]},{"name":"Kombucha starter","ingreds":[]},{"name":"Mafe (peenut stew)","ingreds":["[ ] 4 garlic cloves","[ ] Ginger chunk","[ ] 4 sweet potatoes","[ ] Tbl spoon of cumin","[ ] 1 tin or tomatoes","[ ] 500 ml of veg stock","[ ] About 1/3 to 1/2 of a jar or peanut butter"]},{"name":"Peanut Tofu Buddha Bowl","ingreds":["[ ] 2 cups rice","[ ] shredded carrots","[ ] spinach leaves","[ ] broccoli florets","[ ] sesame oil","[ ] 1 cup chickpeas (drained and rinsed, if using canned)","[ ] 16 oz extra firm tofu, pressed and drained"]},{"name":"Pesto Pasta","ingreds":["[ ] fresh basil","[ ] lemon","[ ] olive oil","[ ] salt","[ ] garlic","[ ] parmesan cheese","[ ] pasta","[ ] artichoke hearts"]},{"name":"Sundried Tomato Pasta","ingreds":["[ ] Sundried Tomato","[ ] Pasta (the good stuff)","[ ] Fhenel"]},{"name":"Teriyaki Salmon","ingreds":["[ ] Salmon (skin on)","[ ] Egg noodals","[ ] Sesamy seed oil","[ ] Sesamy seeds"]},{"name":"Teriyaki sauce","ingreds":["[ ] Light brown sugar (85g)","[ ] Soy sauce (70ml)","[ ] Garlic","[ ] Ginger","[ ] Cornflour","[ ] Rice wine vinegar"]},{"name":"Toad in the hole","ingreds":["[ ] Sausages","[ ] Carrot","[ ] Sweet potato"]},{"name":"Yorkshire pudding mix","ingreds":["[ ] 140g plain flour (200ml/7fl oz)","[ ] 4 eggs (200ml/7fl oz)","[ ] 200ml milk","[ ] sunflower oil, for cooking"]}]';

    this._recipes = JSON.parse(data) as Recipe[];
  }
}
