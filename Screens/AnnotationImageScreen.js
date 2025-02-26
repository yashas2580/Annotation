import React, { useState } from "react";
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Modal, Dimensions, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get("window");

// Sample images
const initialImages = [
  { id: "1", uri: "https://placedog.net/300/300?id=1", saved: false },
  { id: "2", uri: "https://placedog.net/300/300?id=2", saved: false },
  { id: "3", uri: "https://placedog.net/300/300?id=3", saved: false },
  { id: "4", uri: "https://placedog.net/300/300?id=4", saved: false },
  { id: "5", uri: "https://placedog.net/300/300?id=5", saved: false },
  { id: "6", uri: "https://placedog.net/300/300?id=6", saved: false },
  { id: "7", uri: "https://placedog.net/300/300?id=7", saved: false },
  { id: "8", uri: "https://placedog.net/300/300?id=8", saved: false },
];

const AnnotationImageScreen = () => {
  const [images, setImages] = useState(initialImages);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState("all"); // Filter: all, saved, unsaved

  // Filter images based on selection
  const filteredImages = images.filter((img) => {
    if (filter === "saved") return img.saved;
    if (filter === "unsaved") return !img.saved;
    return true; // Show all
  });

  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedImage(filteredImages[index]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  // Mark image as saved
  const handleSave = () => {
    const updatedImages = images.map((img) =>
      img.id === selectedImage.id ? { ...img, saved: true } : img
    );
    setImages(updatedImages);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>🔽 Filter: </Text>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.dropdown}
        >
          <option value="all">All Images</option>
          <option value="saved">Saved Images</option>
          <option value="unsaved">Unsaved Images</option>
        </select>
      </View>

      {/* Image Grid */}
      <FlatList
        data={filteredImages}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openImage(index)} style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.thumbnail} />
            {item.saved && <Icon name="check-circle" size={20} color="green" style={styles.savedIcon} />}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Modal for Full Image View */}
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

          {/* Buttons */}
          <View style={styles.modalButtonContainer}>
            {selectedImage?.saved ? (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Annotate</Text>
              </TouchableOpacity>
            )}

            {!selectedImage?.saved && (
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  dropdown: {
    padding: 8,
    fontSize: 16,
    borderRadius: 5,
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#eee",
    position: "relative",
  },
  thumbnail: {
    width: (width - 20) / 3,
    height: (width - 20) / 3,
    resizeMode: "cover",
  },
  savedIcon: {
    position: "absolute",
    top: 5,
    right: 5,
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
