import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

interface NoteItem {
  uid: number;
  content: string;
  isDone: boolean;
}

export default function TaskPad() {
  const [noteList, setNoteList] = useState<NoteItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() === '') {
      Alert.alert('Warning', 'Couldnt be send empty!');
      return;
    }

    const newNote: NoteItem = {
      uid: Date.now(),
      content: inputValue,
      isDone: false,
    };

    setNoteList(prev => [newNote, ...prev]);
    setInputValue('');
  };

  const handleToggle = (uid: number) => {
    setNoteList(prev =>
      prev.map(item =>
        item.uid === uid ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const handleRemove = (uid: number) => {
    setNoteList(prev => prev.filter(item => item.uid !== uid));
  };

  const renderNote = ({ item }: { item: NoteItem }) => (
    <View style={styles.noteBox}>
      <TouchableOpacity onPress={() => handleToggle(item.uid)}>
        <AntDesign
          name={item.isDone ? 'checkcircle' : 'checkcircleo'}
          size={24}
          color={item.isDone ? '#3aa655' : '#999'}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.noteText,
          item.isDone && styles.strikethrough,
        ]}
      >
        {item.content}
      </Text>
      <TouchableOpacity onPress={() => handleRemove(item.uid)}>
        <Feather name="trash" size={22} color="#c0392b" />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.header}>To Do List</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Yeni qeyd yaz..."
          value={inputValue}
          onChangeText={setInputValue}
          style={styles.textBox}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={handleAdd}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={noteList}
        keyExtractor={item => item.uid.toString()}
        renderItem={renderNote}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 18,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  textBox: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  submitBtn: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    gap: 12,
  },
  noteText: {
    flex: 1,
    fontSize: 16,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
