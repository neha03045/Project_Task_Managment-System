import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { api } from "../../api/apiClient";

export default function Register({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/register", { name, email, password });
      Alert.alert("Success", "Registered successfully");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || "Failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
