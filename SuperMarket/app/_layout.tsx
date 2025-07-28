import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SectionList,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

type Product = {
  name: string;
  price: number;
};

type Category = 'Electronics' | 'Clothing' | 'Groceries' | 'Books';

const CATEGORIES: Category[] = ['Electronics', 'Clothing', 'Groceries', 'Books'];

export default function App() {
  const [selected, setSelected] = useState<Category>('Electronics');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [data, setData] = useState<Record<Category, Product[]>>({
    Electronics: [],
    Clothing: [],
    Groceries: [],
    Books: [],
  });
  const [cart, setCart] = useState<Product[]>([]);

  const addItem = () => {
    if (!itemName || !itemPrice) return;
    const entry: Product = {
      name: itemName,
      price: parseFloat(itemPrice),
    };
    setData((prev) => ({
      ...prev,
      [selected]: [...prev[selected], entry],
    }));
    setItemName('');
    setItemPrice('');
  };

  const deleteItem = (i: number) => {
    const copy = [...data[selected]];
    copy.splice(i, 1);
    setData((prev) => ({
      ...prev,
      [selected]: copy,
    }));
  };

  const addToCart = (p: Product) => {
    setCart((prev) => [...prev, p]);
    Alert.alert('Added to Cart', `${p.name} added successfully`);
  };

  const cartStatus = () => {
    const sum = cart.reduce((acc, el) => acc + el.price, 0);
    return `Cart: ${cart.length} items / ${sum.toFixed(2)} AZN`;
  };

  const sections = CATEGORIES.map((c) => ({
    title: c,
    data: data[c],
  }));

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.cartInfo}>{cartStatus()}</Text>
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.catBtn,
              item === selected && styles.activeCat,
            ]}
            onPress={() => setSelected(item)}
          >
            <Text style={styles.catTxt}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
      <View style={styles.inputWrap}>
        <TextInput
          placeholder="Product name"
          value={itemName}
          onChangeText={setItemName}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={itemPrice}
          onChangeText={setItemPrice}
          keyboardType="numeric"
          style={styles.input}
          onSubmitEditing={addItem}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={addItem}>
          <Text style={styles.submitTxt}>Add</Text>
        </TouchableOpacity>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item, i) => item.name + i}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text>{item.price} AZN</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => addToCart(item)}>
                <Text style={styles.addBtn}>+ Add</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(index)}>
                <Text style={styles.delBtn}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, padding: 10 },
  cartInfo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  catList: { marginBottom: 10 },
  catBtn: {
    padding: 10,
    backgroundColor: '#ccc',
    marginRight: 8,
    borderRadius: 8,
  },
  activeCat: { backgroundColor: '#3b82f6' },
  catTxt: { color: '#000' },
  inputWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 8,
    marginRight: 5,
    marginBottom: 5,
    flexGrow: 1,
    minWidth: '40%',
  },
  submitBtn: {
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  submitTxt: { color: '#fff', fontWeight: 'bold' },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#e5e5e5',
    padding: 6,
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  itemTitle: { fontWeight: 'bold' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  addBtn: {
    color: '#16a34a',
    fontWeight: 'bold',
    marginRight: 10,
  },
  delBtn: { color: '#dc2626', fontSize: 18 },
});
