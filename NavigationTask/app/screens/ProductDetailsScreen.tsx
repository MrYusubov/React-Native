import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from '@/types/Product';
import { RootStackParamList } from '../_layout';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'> & {
  onUpdate: (p: Product) => void;
};

export default function ProductDetailsScreen({ route, navigation, onUpdate }: Props) {
  const { product } = route.params;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);

  const handleSave = () => {
    const updated: Product = {
      ...product,
      name,
      price,
      description,
    };
    onUpdate(updated);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Product Name"
        style={styles.input}
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="save-outline" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: Platform.select({ ios: 'blue', android: 'orange' }),
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
