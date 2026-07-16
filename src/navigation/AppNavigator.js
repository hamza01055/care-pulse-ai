// src/navigation/AppNavigator.js
// Bottom tabs (Dashboard / My Health / Care / Browse)
// + a stack inside "My Health" for BloodPressure → Measure flow.

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

import DashboardScreen from '../screens/DashboardScreen';
import MyHealthScreen from '../screens/MyHealthScreen';
import BloodPressureScreen from '../screens/BloodPressureScreen';
import MeasureScreen from '../screens/MeasureScreen';
import CareScreen from '../screens/CareScreen';
import BrowseScreen from '../screens/BrowseScreen';

const Tab = createBottomTabNavigator();
const HealthStack = createNativeStackNavigator();
const DashStack = createNativeStackNavigator();

function HealthStackNav() {
  return (
    <HealthStack.Navigator screenOptions={{ headerShown: false }}>
      <HealthStack.Screen name="MyHealth" component={MyHealthScreen} />
      <HealthStack.Screen name="BloodPressure" component={BloodPressureScreen} />
      <HealthStack.Screen name="Measure" component={MeasureScreen} />
    </HealthStack.Navigator>
  );
}

function DashboardStackNav() {
  return (
    <DashStack.Navigator screenOptions={{ headerShown: false }}>
      <DashStack.Screen name="DashboardHome" component={DashboardScreen} />
      <DashStack.Screen name="BloodPressure" component={BloodPressureScreen} />
      <DashStack.Screen name="Measure" component={MeasureScreen} />
    </DashStack.Navigator>
  );
}

const TAB_ICONS = {
  DashboardTab: 'home-outline',
  HealthTab: 'heart-outline',
  CareTab: 'people-outline',
  BrowseTab: 'grid-outline',
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.teal,
          tabBarInactiveTintColor: colors.ink3,
          tabBarLabelStyle: { fontWeight: '700', fontSize: 11 },
          tabBarStyle: { paddingTop: 6, height: 84 },
        })}>
        <Tab.Screen name="DashboardTab" component={DashboardStackNav} options={{ title: 'Dashboard' }} />
        <Tab.Screen name="HealthTab" component={HealthStackNav} options={{ title: 'My Health' }} />
        <Tab.Screen name="CareTab" component={CareScreen} options={{ title: 'Care' }} />
        <Tab.Screen name="BrowseTab" component={BrowseScreen} options={{ title: 'Browse' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
