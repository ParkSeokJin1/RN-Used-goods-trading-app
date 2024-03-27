import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import CommentsModal from '../components/CommentsModal';

const {width} = Dimensions.get('window');
const heart = require('../assets/icons/heart.png');
const comment = require('../assets/icons/comment.png');

const Detail = ({route, navigation}) => {
  const {item} = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const [images, setImages] = useState(
    item.selectedItem.images || [item.selectedItem.img],
  );

  const renderImage = ({item}) => (
    <Image source={{uri: item}} style={styles.image} resizeMode="contain" />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.contentName}>{item.title}</Text>

      {/* 이미지 가로 스크롤 FlatList */}
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageList}
      />

      <View style={styles.actionContainer}>
        <TouchableOpacity>
          <Image source={heart} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
          <Image source={comment} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{item.location.address}</Text>
      </View>
      <CommentsModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  mainImage: {
    width: width,
    height: 300,
    marginVertical: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  contentContainer: {
    marginHorizontal: 16,
    alignItems: 'flex-start',
  },
  contentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: 14,
    color: '#4F4F4F',
    marginTop: 4,
  },
  imageList: {
    flexGrow: 0,
    height: 300,
  },
  image: {
    width: width,
    height: 300,
    marginHorizontal: 20,
  },
});

export default Detail;
