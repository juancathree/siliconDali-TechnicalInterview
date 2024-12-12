import { Button, StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";

export default function NumberCounter() {
  const [number, setNumber] = useState(0);

  return (
    <View style={styles.centeredContainer}>
      <Text>Number</Text>
      <TextInput
        value={number.toString()}
        style={styles.input}
        onChangeText={(text) => setNumber(Number(text))}
      />
      <Counter value={number} />
    </View>
  );
}

type CounterProps = {
  value: number;
};

const Counter = ({ value }: CounterProps) => {
  const [number, setNumber] = useState(value);

  useEffect(() => {
    setNumber(value);
  }, [value]);

  const increment = () => setNumber((prev) => prev + 1);
  const decrement = () => setNumber((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <View style={styles.buttonContainer}>
      <Button title="Decrement" onPress={decrement} />
      <Text style={styles.bold}>{number}</Text>
      <Button title="Increment" onPress={increment} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    textAlign: "center",
    width: 50,
    padding: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    gap: 16,
  },
});
