import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_layout';
import { Product } from '@/types/Product';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Add'> & {
  onAdd: (p: Product) => void;
};

export default function AddProductScreen({ navigation, onAdd }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const newProduct: Product = {
      id: uuid.v4().toString(),
      name,
      price,
      description,
      imageUrl: image,
    };
    onAdd(newProduct);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
      />

      {image ? (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      ) : null}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <MaterialIcons name="image" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Pick Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="save-outline" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6c63ff',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: Platform.select({ ios: 'blue', android: 'green' }),
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 15,
    borderRadius: 8,
  },
});
