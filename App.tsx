import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "./frontend/src/navigation/AppNavigator";
import { AuthProvider } from "./frontend/src/context/AuthContext";
import { enableScreens } from "react-native-screens"; 

enableScreens();

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigator />
        </SafeAreaView>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
