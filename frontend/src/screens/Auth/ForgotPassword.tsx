import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { api } from "../../api/apiClient";

export default function ForgotPassword({ navigation }: any) {
  const [email, setEmail] = useState("");

  const handleForgot = async () => {
    try {
      const res = await api.post("/forgot-password", { email });
      Alert.alert("Token Generated", `Your reset token: ${res.data.resetToken}`);
      navigation.navigate("ResetPassword");
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || "Failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail} />
      <Button title="Generate Reset Token" onPress={handleForgot} />
    </View>
  );
}
