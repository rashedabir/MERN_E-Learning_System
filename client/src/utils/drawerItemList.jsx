import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import InfoIcon from "@material-ui/icons/Info";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CategoryIcon from "@material-ui/icons/Category";

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

export const adminDrawerItemList = [
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
    title: "Add Course",
    icon: <AddBoxIcon />,
    path: "/addcourse",
  },
  {
    id: 4,
    title: "Add Category",
    icon: <CategoryIcon />,
    path: "/category",
  },
];
