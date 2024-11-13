import { FiUser, FiDollarSign, FiGrid, FiRadio } from "react-icons/fi";
import { BiMoneyWithdraw} from "react-icons/bi";
import { GiSplitCross } from "react-icons/gi";

export const navlinks = [
  {
    name: "dashboard",
    icon: FiGrid,
    link: "/",
  },
  {
    name: "Unapproved Campaings",
    icon: GiSplitCross,
    link: "/unapproved",
  },
  {
    name: "campaign",
    icon: FiRadio,
    link: "/create",
  },
  {
    name: "payment",
    icon: FiDollarSign,
    link: "/payment",
    disabled: true,
  },
  {
    name: "withdraw",
    icon: BiMoneyWithdraw,
    link: "/withdraw",
    disabled: true,
  },
  {
    name: "profile",
    icon: FiUser,
    link: "/profile",
  },
];
