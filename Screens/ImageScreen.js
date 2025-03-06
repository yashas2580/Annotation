import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Modal, Dimensions, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { GestureHandlerRootView, PinchGestureHandler } from "react-native-gesture-handler";

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

const ImageScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);

  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    setScale(1);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSelectedImage(images[(currentIndex + 1) % images.length]);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]);
  };

  // ✅ Add Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedImage) return; // Ignore if modal is not open

      switch (event.key) {
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "Escape":
          closeModal();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
      <View style={styles.imageGrid}>
        {images.map((item, index) => (
          <TouchableOpacity key={item.id} onPress={() => openImage(index)} style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </View>

      {/* ✅ Modal for Image Preview */}
      <Modal visible={!!selectedImage} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Icon name="x" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.arrowLeft} onPress={prevImage}>
            <Icon name="chevron-left" size={40} color="#fff" />
          </TouchableOpacity>

          <GestureHandlerRootView>
            <PinchGestureHandler onGestureEvent={(event) => setScale(event.nativeEvent.scale)}>
              <View>
                <Image source={{ uri: selectedImage?.uri }} style={[styles.fullImage, { transform: [{ scale }] }]} />
              </View>
            </PinchGestureHandler>
          </GestureHandlerRootView>

          <TouchableOpacity style={styles.arrowRight} onPress={nextImage}>
            <Icon name="chevron-right" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, 
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
  },
  imageContainer: {
    width: (width - 40) / 3,
    height: (width - 40) / 3,
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
});

export default ImageScreen;
