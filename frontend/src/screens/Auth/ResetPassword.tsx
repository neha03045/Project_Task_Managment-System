import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../api/apiClient';

export default function ResetPassword({ navigation }: any) {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleReset = async () => {
    if (!token || !newPassword) {
      Alert.alert('Error', 'Please enter both token and new password');
      return;
    }

    try {
      const response = await api.post('/reset-password', {
        token,
        newPassword,
      });

      if (response.status === 200) {
        Alert.alert(
          'Success',
          'Password reset successful. You can now log in.',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Login'),
            },
          ],
        );
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to reset password',
      );
    }
  };

  return (
    <LinearGradient colors={['#F7F7F7', '#E8E8E8']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your reset token and new password
        </Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Reset Token"
            placeholderTextColor="#999"
            value={token}
            onChangeText={setToken}
            style={styles.input}
          />

          <View style={{ position: 'relative' }}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              style={[styles.input, { paddingRight: 40 }]}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 10, top: 12 }}
            >
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <LinearGradient
              colors={['#D4AF37', '#B8974B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Remembered your password?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  innerContainer: { flex: 1, justifyContent: 'center' },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: { marginTop: 10 },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    color: '#000',
  },
  button: { borderRadius: 20, overflow: 'hidden', marginBottom: 16 },
  buttonGradient: { padding: 16, alignItems: 'center', borderRadius: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  signupText: { fontSize: 14, color: '#666' },
  signupLink: { fontSize: 14, fontWeight: '700', color: '#B8974B' },
});
