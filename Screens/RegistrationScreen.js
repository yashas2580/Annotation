import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";

const RegistrationScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.registrationContainer}>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.nameRow}>
          <TextInput
            style={[styles.nameInput]}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          /> 
          <TextInput
            style={[styles.nameInput, styles.lastNameInput]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.accountText}>
          Already have an account?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            }}
            style={styles.googleLogo}
          />
          <Text style={styles.googleButtonText}>Login using Google</Text>
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
  registrationContainer: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: 600,
    padding: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "blue",
    textAlign: "center",
    marginBottom: 30,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  nameInput: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  lastNameInput: {
    marginRight: 0,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "lightblue",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  createButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  accountText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  loginLink: {
    color: "blue",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

export default RegistrationScreen; 