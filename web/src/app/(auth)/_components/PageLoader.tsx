import { Loader } from "lucide-react";
import { FC, ReactElement } from "react";

const PageLoader: FC = (): ReactElement => {
  return (
    <div className="bg-black/10 flex justify-center items-center z-50 left-0 top-0 absolute h-full w-full">
      <Loader className="animate-spin h-10 w-10" size={30} />
    </div>
  )
}

export default PageLoader;
