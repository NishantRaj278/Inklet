import React from "react";
import MostPopular from "./mostpopular";
import MenuCategories from "./menucategories";
import EditorsChoice from "./editorschoice";

function Menu() {
  return (
    <div className="flex-2 px-4 flex flex-col items-start gap-8">
      <MostPopular />
      <MenuCategories />
      <EditorsChoice />
    </div>
  );
}

export default Menu;
