import React, { useState, useEffect } from "react";
import { 
  View, 
  Image, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Modal, 
  Dimensions,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { GestureHandlerRootView, PinchGestureHandler } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

// Extended image data with comments property and status
const images = [
  { id: "1", uri: "https://placedog.net/300/300?id=1", comments: [], status: null },
  { id: "2", uri: "https://placedog.net/300/300?id=2", comments: [], status: null },
  { id: "3", uri: "https://placedog.net/300/300?id=3", comments: [], status: null },
  { id: "4", uri: "https://placedog.net/300/300?id=4", comments: [], status: null },
  { id: "5", uri: "https://placedog.net/300/300?id=5", comments: [], status: null },
  { id: "6", uri: "https://placedog.net/300/300?id=6", comments: [], status: null },
  { id: "7", uri: "https://placedog.net/300/300?id=7", comments: [], status: null },
  { id: "8", uri: "https://placedog.net/300/300?id=8", comments: [], status: null },
];

const VerifierImageScreen = () => {
  const [imageData, setImageData] = useState(images);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedImage(imageData[index]);
    setScale(1);
    setComment("");
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % imageData.length;
    setCurrentIndex(newIndex);
    setSelectedImage(imageData[newIndex]);
    setScale(1);
    setComment("");
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + imageData.length) % imageData.length;
    setCurrentIndex(newIndex);
    setSelectedImage(imageData[newIndex]);
    setScale(1);
    setComment("");
  };

  const onPinchEvent = (event) => {
    setScale(event.nativeEvent.scale);
  };

  const addComment = () => {
    if (comment.trim() === "") return;
    
    // Create a copy of the imageData array
    const updatedImageData = [...imageData];
    
    // Add the new comment to the current image
    updatedImageData[currentIndex] = {
      ...updatedImageData[currentIndex],
      comments: [
        ...updatedImageData[currentIndex].comments,
        {
          id: Date.now().toString(),
          text: comment,
          timestamp: new Date().toLocaleString(),
        }
      ]
    };
    
    // Update state
    setImageData(updatedImageData);
    setSelectedImage(updatedImageData[currentIndex]);
    setComment("");
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleApprove = () => {
    updateImageStatus('approved');
  };

  const handleFlag = () => {
    updateImageStatus('flagged');
  };

  const handleSubmit = () => {
    // Check if all images have been approved or flagged
    const allImagesReviewed = imageData.every(img => img.status !== null);
    
    if (!allImagesReviewed) {
      Alert.alert(
        "Incomplete Review",
        "Please approve or flag all images before submitting.",
        [{ text: "OK" }]
      );
      return;
    }
    
    // Here you would typically send the data to your backend
    Alert.alert(
      "Submit Successful",
      "All image reviews have been submitted.",
      [{ text: "OK", onPress: () => console.log("Submitted:", imageData) }]
    );
  };

  const updateImageStatus = (status) => {
    const updatedImageData = [...imageData];
    updatedImageData[currentIndex] = {
      ...updatedImageData[currentIndex],
      status: status
    };
    
    setImageData(updatedImageData);
    setSelectedImage(updatedImageData[currentIndex]);
    
    // Optional: Automatically move to next image after decision
    setTimeout(() => {
      if (currentIndex < imageData.length - 1) {
        handleNext();
      } else {
        // If it's the last image, show submit confirmation
        Alert.alert(
          "Review Complete",
          "You've reviewed all images. Would you like to submit now?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Submit", onPress: handleSubmit }
          ]
        );
      }
    }, 500);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={imageData}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openImage(index)} style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.thumbnail} />
            {item.comments.length > 0 && (
              <View style={styles.commentBadge}>
                <Text style={styles.commentCount}>{item.comments.length}</Text>
              </View>
            )}
            {item.status && (
              <View style={[
                styles.statusIndicator, 
                item.status === 'approved' ? styles.approvedIndicator : styles.flaggedIndicator
              ]}>
                <Icon 
                  name={item.status === 'approved' ? "check" : "flag"} 
                  size={14} 
                  color="#fff" 
                />
              </View>
            )}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />
      
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit All</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={!!selectedImage} transparent={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
            <Icon name="x" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.arrowLeft} onPress={handlePrev}>
            <Icon name="chevron-left" size={40} color="#fff" />
          </TouchableOpacity>

          <View style={styles.imageViewContainer}>
            <GestureHandlerRootView>
              <PinchGestureHandler onGestureEvent={onPinchEvent}>
                <Image
                  source={{ uri: selectedImage?.uri }}
                  style={[styles.fullImage, { transform: [{ scale }] }]}
                />
              </PinchGestureHandler>
            </GestureHandlerRootView>
          </View>

          <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
            <Icon name="chevron-right" size={40} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.commentsToggle, { backgroundColor: showComments ? '#3498db' : '#555' }]}
            onPress={toggleComments}
          >
            <Icon name="message-circle" size={24} color="#fff" />
            {selectedImage?.comments.length > 0 && (
              <View style={styles.commentIndicator}>
                <Text style={styles.commentIndicatorText}>{selectedImage.comments.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Action buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.approveButton]}
              onPress={handleApprove}
            >
              <Icon name="check" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>Approve</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.flagButton]}
              onPress={handleFlag}
            >
              <Icon name="flag" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>Flag</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.submitAction]}
              onPress={handleSubmit}
            >
              <Icon name="send" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          {showComments && (
            <View style={styles.commentsContainer}>
              <Text style={styles.commentsTitle}>Comments</Text>
              
              <ScrollView style={styles.commentsList}>
                {selectedImage?.comments.length > 0 ? (
                  selectedImage.comments.map((comment) => (
                    <View key={comment.id} style={styles.commentItem}>
                      <Text style={styles.commentText}>{comment.text}</Text>
                      <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noComments}>No comments yet</Text>
                )}
              </ScrollView>
              
              <View style={styles.addCommentContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Add a comment..."
                  value={comment}
                  onChangeText={setComment}
                  multiline
                />
                <TouchableOpacity style={styles.addButton} onPress={addComment}>
                  <Icon name="send" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
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
    width: (width - 20) / 3, // 3 images per row
    height: (width - 20) / 3,
    resizeMode: "cover",
  },
  commentBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#3498db',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentCount: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  approvedIndicator: {
    backgroundColor: '#2ecc71',
  },
  flaggedIndicator: {
    backgroundColor: '#e74c3c',
  },
  flatListContent: {
    paddingBottom: 60, // Increased padding for submit button
  },
  submitButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width * 0.9,
    height: height * 0.6, // Reduced height to make room for buttons and comments
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 2,
  },
  arrowLeft: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -20 }],
    zIndex: 2,
  },
  arrowRight: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -20 }],
    zIndex: 2,
  },
  commentsToggle: {
    position: 'absolute',
    top: 40,
    right : 80,
    backgroundColor: '#555',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  commentIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentIndicatorText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  commentsContainer: {
    position: 'right',
    bottom: 480,
    left: 500,
    right: 100,
    width : 400,
    backgroundColor: '#222',
    maxHeight: height * 0.4,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 30,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  commentsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentsList: {
    maxHeight: height * 0.25,
  },
  commentItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentText: {
    color: '#fff',
    fontSize: 16,
  },
  commentTimestamp: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  noComments: {
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 15,
  },
  addCommentContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 80,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: height * 0.3,
    left: 0,
    right: 0,
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  approveButton: {
    backgroundColor: '#2ecc71',
  },
  flagButton: {
    backgroundColor: '#e74c3c',
  },
  submitAction: {
    backgroundColor: '#3498db',
  },
});
export default VerifierImageScreen;