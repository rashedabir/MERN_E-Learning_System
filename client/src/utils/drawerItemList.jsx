import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import InfoIcon from "@material-ui/icons/Info";

export const drawerItemList = [
  {
    id: 1,
    title: "Dashboard",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    id: 2,
    title: "Course List",
    icon: <ListIcon />,
    path: "/course",
  },
  {
    id: 3,
    title: "About",
    icon: <InfoIcon />,
    path: "/about",
  },
];
