import { state } from "@shopping/types";

export class ShoppingListRemoter {
  async get() {
    try {
      const shoppingList = await fetch("/restore");
      return (await shoppingList.json()) as state;
    } catch (e) {
      // read from local state
      return this.getFromLocal();
    }
  }

  async getFromLocal() {
    const state = localStorage.getItem("selected");
    if (state !== null) {
      return JSON.parse(state) as state;
    }
    return null;
  }

  async set(state: state) {
    const serialized = JSON.stringify(state);
    localStorage.setItem("selected", serialized);
    return fetch("/save", {
      body: serialized,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
