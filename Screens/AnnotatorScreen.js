import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const AnnotatorScreen = ({ navigation }) => {
  const folders = [
    { id: '1', name: 'Assigned' },
    { id: '2', name: 'Yet to be annotated' },
    { id: '3', name: 'Annotated' }
  ];

  const openFolder = (folderId) => {
  
    if (folderId === '2') {
      navigation.navigate("AnnotationImageScreen", { folderId: 2 }); 
    }
    if(folderId==='1'|| folderId==='3'){
        navigation.navigate("ImageScreen",{folderId:2});
    }
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.logo}>Annotator App</Text>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={20} color="#333" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.header}>
          <TextInput style={styles.searchBar} placeholder="Search..." placeholderTextColor="#aaa" />
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="user" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={folders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openFolder(item.id)} style={styles.folderContainer}>
              <Icon name="folder" size={60} color="#007EE5" />
              <Text style={styles.folderText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          numColumns={2} 
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#fff" },
  sidebar: { width: 250, backgroundColor: "#f8f8f8", padding: 20, borderRightWidth: 1, borderRightColor: "#ddd" },
  logo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  navItem: { flexDirection: "row", alignItems: "center", padding: 15 },
  navText: { marginLeft: 10, fontSize: 16 },
  mainContent: { flex: 1, padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  searchBar: { width: "75%", backgroundColor: "#eee", padding: 8, borderRadius: 5 },
  iconButton: { padding: 5 },
  folderContainer: {
    width: "45%", 
    height: 150,
    margin: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  folderText: { fontSize: 14, marginTop: 10 },
  flatListContent: { justifyContent: "space-around", paddingVertical: 20 },
});

export default AnnotatorScreen;
