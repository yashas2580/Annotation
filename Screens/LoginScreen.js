import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native"; 
const roles = ["User", "Annotator", "Verifier", "Admin"];
const LoginScreen = () => {
  const navigation = useNavigation(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("User");

  const handleLogin = () => {
    if (email && password) {
      alert(`Logging in as ${selectedRole}`);
      if (selectedRole === "User") {
        navigation.navigate("HomeScreen");
      } else if (selectedRole === "Annotator") {
        navigation.navigate("AnnotatorScreen");
      }
    } else {
      alert("Please enter valid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Login</Text>
        <Text style={styles.signText}>Sign in to your Account</Text>

        <View style={styles.inputContainer}>
          <Icon name="email" size={24} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <Text style={styles.roleText}>Select Role:</Text>
        <View style={styles.roleContainer}>
          {roles.map((role) => (
            <TouchableOpacity key={role} style={styles.roleButton} onPress={() => setSelectedRole(role)}>
              <View style={[styles.radioButton, selectedRole === role && styles.radioButtonSelected]} />
              <Text style={styles.roleLabel}>{role}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

    
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  loginContainer: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: 600,
    padding: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  loginText: {
    textAlign: "center",
    color: "#007EE5",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  signText: {
    textAlign: "center",
    color: "#333",
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  roleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#aaa",
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: "#007EE5",
    borderColor: "#007EE5",
  },
  roleLabel: {
    fontSize: 14,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#007EE5",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  forgotPasswordText: {
    textAlign: "center",
    color: "#007EE5",
    fontSize: 14,
    marginTop: 10,
  },
});

export default LoginScreen; 
