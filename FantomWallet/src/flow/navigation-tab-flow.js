declare type TNavigationTabTypes = {
  activeTabIndex: number,
  index: number,
  activeTabColor: string,
  inActiveTabColor: string,
  tabInfo: {
    route: string,
    icon: string
  },
  handleSelectedTab: string => void
};
