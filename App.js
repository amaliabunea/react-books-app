import React, { useEffect, useRef } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { getLogger, navService } from './core';
import { AuthLoading, Auth, AuthStore } from './auth';
import {BookStore, Screens} from "./screens";
import { View, Animated, Text } from 'react-native';
const log = getLogger('App');

const AppContainer = createAppContainer(
    createSwitchNavigator(
        { AuthLoading, Screens, Auth },
        { initialRouteName: 'AuthLoading' },
    )
);

const App = () => {
  log('render');
  return (
      <AuthStore>
        <BookStore>
          <AppContainer ref={navigatorRef => {
            navService.setTopLevelNavigator(navigatorRef);
          }} />
        </BookStore>
      </AuthStore>
  );
};

export default App;
