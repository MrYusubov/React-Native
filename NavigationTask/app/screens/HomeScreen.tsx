import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_layout';
import { Product } from '@/types/Product';
import ProductItem from '@/components/ProductItem';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  products: Product[];
};

export default function HomeScreen({ navigation, products }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onPress={() =>
              navigation.navigate('Details', {
                product: item,
                onUpdate: (p: Product) => {
                  const index = products.findIndex(prod => prod.id === p.id);
                  if (index !== -1) products[index] = p;
                },
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Add', { onAdd: () => {} })}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.fabText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  fabText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});
