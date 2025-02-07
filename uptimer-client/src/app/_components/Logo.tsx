import { MonitorUp } from "lucide-react";

const Logo = ({ size }: { size?: string }) => {
  return (
    <div className="text-[--red] relative z-10 flex items-center gap-2 cursor-pointer justify-center self-center text-2xl font-semibold ">
      <MonitorUp size={size === 'large' ? 58 : 32} />
      <span className={`${size === 'large' ? 'text-4xl' : ''}`}>Uptimer</span>
    </div>
  );
}

export default Logo;
