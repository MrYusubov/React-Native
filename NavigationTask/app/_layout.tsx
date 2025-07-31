import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Product } from '@/types/Product';
import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  Add: { onAdd: (p: Product) => void };
  Details: { product: Product; onUpdate: (p: Product) => void };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev =>
      prev.map(p => (p.id === updated.id ? updated : p))
    );
  };

  return (
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {props => (
            <HomeScreen {...props} products={products} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Add">
          {props => (
            <AddProductScreen {...props} onAdd={addProduct} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Details">
          {props => (
            <ProductDetailsScreen {...props} onUpdate={updateProduct} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
  );
}
