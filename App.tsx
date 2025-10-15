import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "./frontend/src/navigation/AppNavigator";
import { AuthProvider } from "./frontend/src/context/AuthContext";
import { enableScreens } from "react-native-screens"; 
import RNBootSplash from "react-native-bootsplash";
enableScreens();

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  useEffect(() => {
  const hideSplash = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000)); 
    RNBootSplash.hide({ fade: true });
  };
  hideSplash();
}, []);


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
