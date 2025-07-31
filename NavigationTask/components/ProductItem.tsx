import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Product } from '../types/Product';
import { Ionicons } from '@expo/vector-icons';

export default function ProductItem({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: product.imageUrl }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Ionicons name="pricetag-outline" size={16} color="#4caf50" />
          <Text style={styles.price}>{product.price} ₼</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 10,
    elevation: 2, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#4caf50',
    marginLeft: 4,
    fontWeight: '500',
  },
});
