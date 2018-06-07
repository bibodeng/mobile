import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  NativeModules,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux'
import EngineActions, { EngineSelectors } from '../Redux/EngineRedux'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      this.props.setUserData(JSON.parse(userData))
    }
    const userProfile = await AsyncStorage.getItem('userProfile');
    if (userProfile) {
      this.props.setUserProfile(JSON.parse(userProfile))
    }
    const token = await AsyncStorage.getItem('token')
    this.props.setToken(token)

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userData ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userData) => dispatch(EngineActions.setUserData(userData)),
    setUserProfile: (userProfile) => dispatch(EngineActions.setUserProfile(userProfile)),
    setToken: (token) => dispatch(EngineActions.setToken(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)