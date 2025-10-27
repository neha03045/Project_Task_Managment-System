import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { api } from '../../api/apiClient';

export default function ForgotPassword({ navigation }: any) {
  const [email, setEmail] = useState('');

  const handleForgot = async () => {
    try {
      const res = await api.post('/forgot-password', { email });
      Alert.alert(
        'Token Generated',
        `Your reset token: ${res.data.resetToken}`,
      );
      navigation.navigate('ResetPassword');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed');
    }
  };

return (
  <LinearGradient colors={['#F7F7F7', '#E8E8E8']} style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.innerContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email to reset password
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleForgot}>
          <LinearGradient
            colors={['#D4AF37', '#B8974B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Generate Token</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Remembered password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signupLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  </LinearGradient>
);

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  innerContainer: { flex: 1, justifyContent: 'center' },

  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '700', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 6, textAlign: 'center' },

  form: { gap: 16 }, 

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    color: '#000',
  },

  button: { borderRadius: 20, overflow: 'hidden' },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  signupContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  signupText: { fontSize: 14, color: '#666' },
  signupLink: { fontSize: 14, fontWeight: '700', color: '#B8974B' },
});

