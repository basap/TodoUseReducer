import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native";
import TodoItem from "./components/TodoItem";
import { useTodos } from "./hooks/useTodos";

export default function App() {
  const [text, setText] = useState("");
  const { todos, addTodo, toggleTodo } = useTodos();

  const handleAddTodo = () => {
    addTodo(text);
    setText("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Enter task" value={text} onChangeText={setText}/>
        <Button title="Save" onPress={handleAddTodo} />
      </View>

      <FlatList data={todos} keyExtractor={(_, index) => index.toString()} renderItem={({ item, index }) => (
          <TodoItem todo={item} onToggle={() => toggleTodo(index)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center"
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10
  },
  input: {
    flex: 1,
    padding: 10
  }
});

