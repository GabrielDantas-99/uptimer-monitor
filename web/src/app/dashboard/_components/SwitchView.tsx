'use client'

import { setLocalStorageItem } from "@/utils/utils";
import { Grid, List } from "lucide-react";
import { useState } from "react";

interface SwitchViewParams {
  view: string,
  setView: (item: string) => void
}

const SwitchView = ({ view, setView }: SwitchViewParams) => {
  const [isGridView, setIsGridView] = useState(false)
  function handleIsGridView() {
    setIsGridView(!isGridView)
    const item = view === 'box' ? 'list' : 'box';
    setLocalStorageItem('view', JSON.stringify(item));
    setView(item);
  }
  return (
    <button onClick={() => handleIsGridView()} className="relative rounded-lg h-9 p-1 w-fit border border-primary gap-2 flex items-center justify-between">
      <div className={`absolute duration-200 ease-linear ${isGridView ? 'translate-x-0' : 'translate-x-10'} bg-primary rounded-md w-8 h-7`}></div>
      <div className={`${isGridView ? 'text-white' : 'text-inherit'} z-20 duration-200 rounded  p-1 `}>
        <Grid />
      </div>
      <div className={`${!isGridView ? 'text-white' : 'text-inherit'} z-20 duration-200 rounded p-1`}>
        <List />
      </div>
    </button>
  );
}

export default SwitchView;
