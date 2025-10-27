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
    <LinearGradient colors={['#F7F7F7', '#E8E8E8']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to continue</Text>
        </View>

        {/* Form */}
       
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={{ position: 'relative' }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { paddingRight: 40 }]}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{ alignSelf: 'flex-end', marginBottom: 16 }}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <LinearGradient
              colors={['#D4AF37', '#B8974B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}> Sign Up</Text>
            </TouchableOpacity>
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
  subtitle: { fontSize: 16, color: '#666', marginTop: 6 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  input: {
    backgroundColor: '#F7F7F7',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  eyeIcon: { position: 'absolute', right: 10, top: 12 },
  forgotText: { color: '#B8974B', fontSize: 14, fontWeight: '700' },
  button: { borderRadius: 20, overflow: 'hidden', marginBottom: 16 },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  signupContainer: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { fontSize: 14, color: '#666' },
  signupLink: { fontSize: 14, fontWeight: '700', color: '#B8974B' },
});
