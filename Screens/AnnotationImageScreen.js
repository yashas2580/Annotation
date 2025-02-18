import React, { useState } from "react";
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Modal, Dimensions, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get("window");

const images = [
  { id: "1", uri: "https://placedog.net/300/300?id=1" },
  { id: "2", uri: "https://placedog.net/300/300?id=2" },
  { id: "3", uri: "https://placedog.net/300/300?id=3" },
  { id: "4", uri: "https://placedog.net/300/300?id=4" },
  { id: "5", uri: "https://placedog.net/300/300?id=5" },
  { id: "6", uri: "https://placedog.net/300/300?id=6" },
  { id: "7", uri: "https://placedog.net/300/300?id=7" },
  { id: "8", uri: "https://placedog.net/300/300?id=8" },
];

const AnnotationImageScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openImage(index)} style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />

      <Modal visible={!!selectedImage} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
            <Icon name="x" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.arrowLeft} onPress={handlePrev}>
            <Icon name="chevron-left" size={40} color="#fff" />
          </TouchableOpacity>

          <Image source={{ uri: selectedImage?.uri }} style={styles.fullImage} />

          <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
            <Icon name="chevron-right" size={40} color="#fff" />
          </TouchableOpacity>

          {/* Annotate and Submit Buttons */}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Annotate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
  },
  imageContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  thumbnail: {
    width: (width - 20) / 3,
    height: (width - 20) / 3,
    resizeMode: "cover",
  },
  flatListContent: {
    paddingBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: width * 0.9,
    height: height * 0.8,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  arrowLeft: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -20 }],
  },
  arrowRight: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -20 }],
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "80%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007EE5",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AnnotationImageScreen;
