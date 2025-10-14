import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { api } from "../../api/apiClient";

export default function ResetPassword({ navigation }: any) {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {
    try {
      await api.post("/reset-password", { token, newPassword });
      Alert.alert("Success", "Password reset successful");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || "Failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Reset Token" value={token} onChangeText={setToken} />
      <TextInput placeholder="New Password" secureTextEntry value={newPassword} onChangeText={setNewPassword} />
      <Button title="Reset Password" onPress={handleReset} />
    </View>
  );
}
