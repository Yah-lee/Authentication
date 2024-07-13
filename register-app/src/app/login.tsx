import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://172.20.10.4:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        Alert.alert("Login successful");
        router.push("/home");
      } else {
        Alert.alert(
          "Login failed",
          "Incorrect email or password. Please try again."
        );
      }
    } catch (error) {
      Alert.alert("An error occurred", "Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <TouchableOpacity
        className="absolute top-20 left-8"
        onPress={() => router.push("/")}
      >
        <Icon name="home" size={30} color="#000" />
      </TouchableOpacity>
      <Text className="text-4xl font-bold mb-28 text-gray-800">Login</Text>
      <TextInput
        placeholder="Email"
        className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-500"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-500"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        onPress={handleLogin}
        className="w-full h-12 bg-blue-600 rounded-lg justify-center items-center placeholder:text-gray-500"
      >
        <Text className="text-white text-lg font-semibold">Login</Text>
      </TouchableOpacity>
      <Text className="mt-4 text-gray-600">
        Don't have an account?{" "}
        <Text
          className="text-blue-600 font-semibold"
          onPress={() => router.push("/register")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
