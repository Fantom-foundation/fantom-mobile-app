import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function reset(routeName, params) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  );
}

function replace(routeName, params) {
  navigator.dispatch(
    StackActions.replace({
      key: null,
      routeName,
      params,
    }),
  );
}

function pop() {
  navigator.dispatch(StackActions.pop());
}

function popToTop() {
  navigator.dispatch(StackActions.popToTop());
}

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return this.getActiveRouteName(route);
  }
  return route.routeName;
}

export default {
  navigate,
  reset,
  replace,
  pop,
  popToTop,
  setTopLevelNavigator,
  getActiveRouteName,
};
