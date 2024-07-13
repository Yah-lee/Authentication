import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons

const Home = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://172.20.10.4:4000/user");
        setUsers(response.data.rows);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const renderItem = ({ item, index }) => (
    <View className="bg-white p-4 rounded-lg shadow mb-4">
      <Text className="text-lg font-bold">No: {index + 1}</Text>
      <Text className="text-lg font-bold">
        Name: {item.firstName} {item.lastName}
      </Text>
      <Text className="text-sm text-gray-500">Email: {item.email}</Text>
      <Text className="text-sm text-gray-500">
        Birthday: {new Date(item.birthday).toLocaleDateString()}
      </Text>
      <Text className="text-sm text-gray-500">
        Number Phone: {item.phonenumber}
      </Text>
    </View>
  );

  const handleLogout = () => {
    // Handle any logout logic here, e.g., clearing tokens, etc.
    router.push("/login");
  };

  return (
    <View className="flex-1 bg-gray-100 p-4 py-20">
      <View className="flex flex-row items-center justify-between mb-4">
        <Text className="text-3xl font-bold">All Users :</Text>
        <TouchableOpacity
          onPress={handleLogout}
          className=" px-4 py-2 rounded-lg"
        >
          <Icon name="home" size={30} color="red" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Home;
