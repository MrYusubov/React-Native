import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';

interface Fruit {
  id: number;
  name: string;
  src: ImageSourcePropType;
}

interface Selection {
  index: number;
  fruit: Fruit;
}

const allFruits: Fruit[] = [
  { id: 1, name: 'apple', src: require('../assets/apple.jpg') },
  { id: 2, name: 'banana', src: require('../assets/banan.jpg') },
  { id: 3, name: 'orange', src: require('../assets/orange.jpg') },
  { id: 4, name: 'uzum', src: require('../assets/uzum.jpg') },
  { id: 5, name: 'pineapple', src: require('../assets/pineapple.jpg') },
  { id: 6, name: 'blueberry', src: require('../assets/blueberry.jpg') },
  { id: 7, name: 'alca', src: require('../assets/alca.jpg') },
  { id: 8, name: 'erik', src: require('../assets/erik.jpg') },
  { id: 9, name: 'nar', src: require('../assets/nar.jpg') },
  { id: 10, name: 'peach', src: require('../assets/peach.jpg') },
  { id: 11, name: 'strawberry', src: require('../assets/strawberry.jpg') },
  { id: 12, name: 'pear', src: require('../assets/pear.jpg') },
];

export default function App() {
  const [gameFruits, setGameFruits] = useState<Fruit[]>([]);
  const [showImages, setShowImages] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(5);
  const [started, setStarted] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [filledCells, setFilledCells] = useState<(Fruit | null)[]>([]);
  const [result, setResult] = useState<{ correct: number; wrong: number } | null>(null);

  const startGame = () => {
    const selected = [...allFruits].sort(() => Math.random() - 0.5).slice(0, 6);
    const duplicated = [...selected, ...selected].sort(() => Math.random() - 0.5);
    setGameFruits(duplicated);
    setFilledCells(Array(12).fill(null));
    setSelectedCell(null);
    setResult(null);
    setTimer(5);
    setShowImages(true);
    setStarted(true);
  };

  useEffect(() => {
    let countdown: ReturnType<typeof setInterval>;
    if (showImages && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setShowImages(false);
    }
    return () => clearInterval(countdown);
  }, [showImages, timer]);

  const handleCellPress = (index: number) => {
    if (!showImages && !filledCells[index]) {
      setSelectedCell(index);
    }
  };

  const handleFruitSelect = (fruit: Fruit) => {
    if (selectedCell === null) return;
    const newFilled = [...filledCells];
    newFilled[selectedCell] = fruit;
    setFilledCells(newFilled);
    setSelectedCell(null);
  };

  const handleFinish = () => {
    let correct = 0;
    gameFruits.forEach((fruit, index) => {
      if (filledCells[index]?.id === fruit.id) correct++;
    });
    const wrong = gameFruits.length - correct;
    setResult({ correct, wrong });
  };

  const getCellBorderColor = (index: number) => {
    if (!result) return '#ccc';
    if (!filledCells[index]) return '#ccc';
    return filledCells[index]?.id === gameFruits[index].id ? 'green' : 'red';
  };

  return (
    <SafeAreaView style={styles.container}>
      {!started && (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>
      )}

      {started && (
        <>
          {showImages && <Text style={styles.timer}>Save: {timer}</Text>}
          <View style={styles.grid}>
            {gameFruits.map((fruit, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.cell, { borderColor: getCellBorderColor(index) }]}
                onPress={() => handleCellPress(index)}
                disabled={!!filledCells[index] || showImages}
              >
                {showImages ? (
                  <Image source={fruit.src} style={styles.image} />
                ) : filledCells[index] ? (
                  <Image source={filledCells[index]!.src} style={styles.image} />
                ) : (
                  <Text style={styles.placeholder}>?</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {selectedCell !== null && (
            <View style={styles.selectorContainer}>
              <Text style={styles.selectTitle}>Choose A fruit:</Text>
              <ScrollView horizontal>
                {allFruits.map((fruit) => (
                  <TouchableOpacity
                    key={fruit.id}
                    style={styles.selectorItem}
                    onPress={() => handleFruitSelect(fruit)}
                  >
                    <Image source={fruit.src} style={styles.selectorImage} />
                    <Text style={styles.selectorText}>{fruit.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {!showImages && filledCells.every((cell) => cell !== null) && !result && (
            <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
              <Text style={styles.startText}>Finish</Text>
            </TouchableOpacity>
          )}

          {result && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>Correct: {result.correct}</Text>
              <Text style={styles.resultText}>Mistake: {result.wrong}</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  startButton: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    marginTop: 100,
  },
  startText: {
    color: '#fff',
    fontSize: 20,
  },
  timer: {
    fontSize: 18,
    marginVertical: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  cell: {
    width: 90,
    height: 90,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  placeholder: {
    fontSize: 24,
    color: '#aaa',
  },
  selectorContainer: {
    marginTop: 20,
  },
  selectTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  selectorItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  selectorImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  selectorText: {
    fontSize: 12,
  },
  finishButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    marginVertical: 4,
  },
});
