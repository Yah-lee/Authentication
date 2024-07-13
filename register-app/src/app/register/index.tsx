import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Register() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSignup = async () => {
    if (!email.includes("@")) {
      Alert.alert(
        "Invalid email address",
        "Please enter a valid email address that includes '@'."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords do not match",
        "Please ensure that both passwords match."
      );
      return;
    }

    const userData = {
      firstName,
      lastName,
      birthday: birthday.toISOString().split("T")[0],
      email,
      phonenumber: phoneNumber,
      password,
    };

    try {
      const response = await fetch("http://172.20.10.4:4000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        Alert.alert("Signup successful");
        router.push("/login");
      } else {
        Alert.alert("Signup failed", "Please try again.");
      }
    } catch (error) {
      Alert.alert("An error occurred", "Please try again.");
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(false);
    setBirthday(currentDate);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-20 text-gray-800">Register</Text>
      <TextInput
        placeholder="First Name"
        className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-500"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-500"
        value={lastName}
        onChangeText={setLastName}
      />
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg justify-center"
      >
        <Text className="text-gray-600">
          {birthday.toISOString().split("T")[0]}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <TextInput
        placeholder="Email"
        className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-500"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Phone Number"
        className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-500"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-500"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-500"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        onPress={handleSignup}
        className="w-full h-12 bg-blue-600 rounded-lg justify-center items-center"
      >
        <Text className="text-white text-lg font-semibold">Signup</Text>
      </TouchableOpacity>
      <Text className="mt-4 text-gray-600">
        Already have an account?{" "}
        <Text
          className="text-blue-600 font-semibold"
          onPress={() => router.push("/login")}
        >
          Sign in
        </Text>
      </Text>
    </View>
  );
}
