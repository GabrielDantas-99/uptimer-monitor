'use client'

import { Grid, List } from "lucide-react";
import { useState } from "react";

const SwitchView = () => {
  const [isGridView, setIsGridView] = useState(false)
  return (
    <button onClick={() => setIsGridView(!isGridView)} className="relative rounded-lg h-9 p-1 w-fit border border-primary gap-2 flex items-center justify-between">
      <div className={`absolute duration-200 ease-linear ${isGridView ? 'translate-x-0' : 'translate-x-10'} bg-primary rounded-md w-8 h-7`}></div>
      <div className={`${isGridView ? 'text-white' : 'text-inherit'} z-20 duration-200 rounded text-white p-1 `}>
        <Grid />
      </div>
      <div className={`${!isGridView ? 'text-white' : 'text-inherit'} z-20 duration-200 rounded text-white p-1`}>
        <List />
      </div>
    </button>
  );
}

export default SwitchView;
