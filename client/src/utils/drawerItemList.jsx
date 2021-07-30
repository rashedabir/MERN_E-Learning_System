import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import InfoIcon from "@material-ui/icons/Info";

export const drawerItemList = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Course List",
    icon: <ListIcon />,
    path: "/course",
  },
  {
    title: "About",
    icon: <InfoIcon />,
    path: "/about",
  },
];
