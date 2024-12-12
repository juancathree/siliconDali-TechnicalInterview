import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (id: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  const users = await response.json();
  return users as User;
};

export default function ItemDetails() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { data: user, isLoading } = useQuery({
    queryKey: [`users/${id}`],
    queryFn: () => fetchUser(id as string),
  });

  useEffect(() => {
    if (user) {
      navigation.setOptions({
        headerShown: true,
        title: `Details for user ${user.name}`,
      });
    }
  }, [user, id]);

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.centeredContainer}>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>Website: {user.website}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
