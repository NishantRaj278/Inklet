import React from "react";
import EditorsChoiceItems from "./editorschoiceitems";

function EditorsChoice() {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <h4 className="text-sm text-gray-500">Chosen by editor</h4>
      <h1 className="text-3xl font-semibold">Editors Pick</h1>

      <div className="flex flex-col gap-4 w-full mt-8">
        <EditorsChoiceItems />
        <EditorsChoiceItems />
        <EditorsChoiceItems />
        <EditorsChoiceItems />
      </div>
    </div>
  );
}

export default EditorsChoice;
