/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import "~/utils/shim";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import DeviceInfo from "react-native-device-info";
import { getAppStoreVersion } from "./utils/converts";
import RootNavigator from "~/navigation/RootNavigator";
import { NavigationService } from "~/navigation/helpers";
import { store, persistor } from "~/redux/store";
import DropdownNotification from "~/components/DropdownNotification";
import UpdateAppDropdown from "./components/general/updateAppDropdown";
console.disableYellowBox = true;
export default () => {
  const [appVersion, setAppVersion] = useState("");
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const [isInitial, setIsInitial] = useState(false);
  const version = DeviceInfo.getVersion();

  useEffect(() => {
    getAppStoreVersion().then(result => {
      if (result && result.version) {
        setAppVersion(result.version);
        if (!isInitial) {
          setIsDisplayModal(true);
          setIsInitial(true);
        }
      }
    });
    let timer;
    if (isDisplayModal && isInitial) {
      timer = setTimeout(() => {
        setIsDisplayModal(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <StatusBar barStyle="light-content" />
          <RootNavigator
            ref={navigatorRef =>
              NavigationService.setTopLevelNavigator(navigatorRef)
            }
          />
          <DropdownNotification />
          {isDisplayModal && version && version !== appVersion && (
            <UpdateAppDropdown isDisplayModal />
          )}
        </>
      </PersistGate>
    </Provider>
  );
};
