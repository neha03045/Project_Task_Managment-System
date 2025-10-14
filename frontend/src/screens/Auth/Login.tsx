import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../api/apiClient';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
export default function Login({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { setToken } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await api.post('/login', { email, password });
      setToken(res.data.token);
      Alert.alert('Success', 'Login successful');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <LinearGradient colors={['#FAFAFA', '#F0F0F0']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={{ position: 'relative' }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { color: '#000', paddingRight: 40}]} 
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 15,
                top: '20%',
              }}
            >
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#A0A0A0"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <LinearGradient
              colors={['#FFD43B', '#FBC02D']}
              style={styles.loginButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    color: '#2F5233',
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 6,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  loginButton: {
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  loginButtonGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#2F5233',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotText: {
    color: '#2F5233',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 15,
  },
});
