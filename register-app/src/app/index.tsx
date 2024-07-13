import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white justify-around items-center p-6">
      <View className="">
        <Image
          source={{ uri: "https://your-image-url.com/welcome.png" }}
          className="w-32 h-32 mb-6"
        />
        <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Welcome To Our Website!
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-8">
          Backend Development by Yah LPL & Frontend Development by TKXDev
        </Text>
      </View>
      <TouchableOpacity
        className="bg-blue-500 py-3 px-6 rounded-full"
        onPress={() => router.push("/login")}
      >
        <Text className="text-white text-lg">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
