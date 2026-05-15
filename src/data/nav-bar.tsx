import { BrowseGenresList } from "../components/header/browse-genres-list";
import type { NavBarDropdownProps } from "../components/header/nav-bar-dropdown";
import type { ReactNode } from "react";

const browseDropDownItems = [
  { name: "Genres", urlPath: "/genres" },
  { name: "New Releases", urlPath: undefined },
  { name: "Lists", urlPath: undefined },
];

const communityDropdownItems = [
  { name: "Quotes", urlPath: undefined },
  { name: "Ask the Author", urlPath: undefined },
];

interface DropdownMenuI {
  items: NavBarDropdownProps["items"];
  extraContent?: ReactNode
}

const dropdownMenus: Record<string, DropdownMenuI> = {
  Browse: { items: browseDropDownItems, extraContent: <BrowseGenresList /> },
  Community: { items: communityDropdownItems },
};

const tabs = ["Home", "My Books", "Browse", "Community"];

const tabsUrlPaths: Record<string, string> = {
  Home: "/"
}

export const NAV_BAR_DATA = {
  browseDropDownItems,
  communityDropdownItems,
  tabs,
  dropdownMenus,
  tabsUrlPaths
};
