import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const HomeScreen = () => {
  const { token, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null); // Clear token to log out
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to the Project Task App!</Text>
      {token && <Text style={styles.token}>Your token: {token}</Text>}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  welcome: {
    fontSize: 24,
    marginBottom: 20,
  },
  token: {
    marginBottom: 20,
    fontSize: 12,
    color: "gray",
  },
});

export default HomeScreen;
