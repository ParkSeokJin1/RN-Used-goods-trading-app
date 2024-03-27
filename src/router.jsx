import React from 'react';
import Splash from './pages/Splash'; // Splash 컴포넌트 임포트 추가
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomBottomTab from './components/CustomBottomTab';
import Search from './pages/Search';
import MyPage from './pages/Mypage';
import Add from './pages/Add';
import Detail from './pages/Detail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = props => <CustomBottomTab {...props} />;

// Home , add , detail 을 하나로 묶기.
const HomeScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="홈" component={Home} />
      <Stack.Screen name="추가" component={Add} />
      <Stack.Screen name="디테일" component={Detail} />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="검색" component={Search} />
      <Tab.Screen name="마이페이지" component={MyPage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // gestureEnabled: false
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
};

export default Router;
