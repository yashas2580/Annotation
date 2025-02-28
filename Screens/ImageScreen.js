import React, { useState } from "react";
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Modal, Dimensions, ScrollView } from "react-native";
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
  const [likedImages, setLikedImages] = useState({}); 
  const [buttonColor, setButtonColor] = useState("yellow"); 

  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    setScale(1);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
    setScale(1);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
    setScale(1);
  };

  const onPinchEvent = (event) => {
    setScale(event.nativeEvent.scale);
  };

  const toggleLike = (id) => {
    setLikedImages((prevLikedImages) => ({
      ...prevLikedImages,
      [id]: !prevLikedImages[id], // Toggle like status for the specific image
    }));
  };

  const toggleColor = () => {
    if (buttonColor === "yellow") {
      setButtonColor("green");
    } else if (buttonColor === "green") {
      setButtonColor("red");
    } else {
      setButtonColor("yellow");
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
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
        nestedScrollEnabled={true}
      />

      <Modal visible={!!selectedImage} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
            <Icon name="x" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.arrowLeft} onPress={handlePrev}>
            <Icon name="chevron-left" size={40} color="#fff" />
          </TouchableOpacity>

          <GestureHandlerRootView>
            <PinchGestureHandler onGestureEvent={onPinchEvent}>
              <View>
                <Image
                  source={{ uri: selectedImage?.uri }}
                  style={[styles.fullImage, { transform: [{ scale }] }]}
                />
              </View>
            </PinchGestureHandler>
          </GestureHandlerRootView>

          <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
            <Icon name="chevron-right" size={40} color="#fff" />
          </TouchableOpacity>

         
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.yellowButton]}
              onPress={() => setButtonColor("yellow")}
            >
              <Icon name="circle" size={30} color="yellow" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.greenButton]}
              onPress={() => setButtonColor("green")}
            >
              <Icon name="circle" size={30} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.redButton]}
              onPress={() => setButtonColor("red")}
            >
              <Icon name="circle" size={30} color="red" />
            </TouchableOpacity>

            {/* Like Button for the current image */}
            <TouchableOpacity
              style={[styles.likeButton, { backgroundColor: likedImages[selectedImage?.id] ? "#1877F2" : "#fff" }]} // Blue when liked
              onPress={() => toggleLike(selectedImage?.id)}
            >
              <Icon
                name={likedImages[selectedImage?.id] ? "heart" : "heart-outline"}
                size={30}
                color={likedImages[selectedImage?.id] ? "#fff" : "#1877F2"} // White when liked, blue outline when not
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: "100vh",
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
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
  buttonsContainer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  yellowButton: {
    backgroundColor: "yellow",
  },
  greenButton: {
    backgroundColor: "green",
  },
  redButton: {
    backgroundColor: "red",
  },
  likeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1877F2",
    marginLeft: 10,
  },
});

export default ImageScreen;
