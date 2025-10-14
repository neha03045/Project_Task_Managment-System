import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screens/Auth/Login";
import { AuthContext } from "../context/AuthContext";
import Register from "../screens/Auth/Register";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import HomeScreen from "../screens/Comments/Home";
import ResetPassword from "../screens/Auth/ResetPassword";

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          // If logged in, show Home
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        ) : (
          // If not logged in, show auth flow
          <>
            <Stack.Screen
              name="SignIn"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPassword"
             component={ResetPassword}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
