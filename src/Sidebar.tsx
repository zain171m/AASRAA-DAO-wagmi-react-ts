import { useEffect, useState } from "react";
import { navlinks } from "./constants";
import { FaAccusoft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { IconType } from "react-icons/lib";

const NavItem = ({
  name,
  icon: Icon,
  disabled,
  isActive,
  onClick,
}: {
  name: string;
  icon: IconType;
  disabled: boolean | undefined;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`${isActive && "bg-zinc-800 text-purple-600"} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } p-2 text-zinc-400 hover:text-purple-600 hover:bg-zinc-800 rounded-md relative group flex items-center transition-all duration-200`}
    >
      <Icon size={25} />
      <span className="text-xs text-zinc-300 bg-zinc-800 p-2 absolute ml-10 rounded-sm hidden group-hover:flex">
        {name}
      </span>
    </div>
  );
};

const Sidebar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsActive(location.pathname);
  }, [location.pathname]);

  return (
    <div className="p-3 flex ">
      <div className="flex flex-col items-center gap-5 ">
        <div className="py-3 text-accent hover:bg-purple-600">
          <FaAccusoft size={30} className="text-purple-600 " />
        </div>
        {navlinks.map((item) => (
          <NavItem
            key={item.name}
            {...item}
            name={item.name}
            icon={item.icon}
            disabled={item.disabled}
            isActive={isActive === item.link}
            onClick={() => {
              if (!item.disabled) {
                setIsActive(item.name);
                navigate(item.link);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
