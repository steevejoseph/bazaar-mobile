import React from 'react';
import { Text, View } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Landing from './components/pages/Landing';
import LoginForm from './components/pages/LoginForm';
import SignupForm from './components/pages/SignupForm';
import { Explore, Favorites, Inbox, Profile, MyServices } from './components/pages/index';

const RouterComponent = () => {
  const { navTitleStyle } = styles;

  return (
    <Router>
      <Scene key="root">
        <Scene key="Landing" component={Landing} title="Bazaar" titleStyle={navTitleStyle} initial />
        <Scene key="LoginForm" component={LoginForm} />
        <Scene key="SignupForm" component={SignupForm} />
        <Scene key="Explore" component={Explore} title="Explore" />
        <Scene key="Favorites" component={Favorites} title="Favorites" />
        <Scene
          key="MyServices"
          component={MyServices}
          title="My Services"
          rightTitle="Add"
          onRight={() => console.log()}
        />
        <Scene key="Inbox" component={Inbox} title="Inbox" />
        <Scene key="Profile" component={Profile} title="Profile" />
      </Scene>
    </Router>
  );
};

const styles = {
  navTitleStyle: {
    flex: 1,
    textAlign: 'center',
  },
};

export default RouterComponent;
