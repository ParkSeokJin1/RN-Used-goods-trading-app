import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';

const dummy_search = [
  {
    id: '노트북',
    img: 'https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_1280.jpg',
    isMulti: true,
    price: 30000,
  },
  {
    id: '티비',
    img: 'https://media.istockphoto.com/id/1467715632/ko/%EC%82%AC%EC%A7%84/%EA%B1%B0%EC%8B%A4%EC%9D%98-tv-%ED%99%94%EB%A9%B4-%EB%AA%A8%ED%98%95-3d-%EB%A0%8C%EB%8D%94%EB%A7%81.jpg?s=1024x1024&w=is&k=20&c=5I-k5dYA_jV_uvoHdioWTni1V9y3JaNH-rbUQKVJyzA=',
    isMulti: false,
    price: 200000,
  },
  {
    id: '냉장고',
    img: 'https://media.istockphoto.com/id/1399160717/ko/%EC%82%AC%EC%A7%84/%EB%B9%88-%EB%B0%A9%EC%97%90-%EC%84%9C%EC%9E%88%EB%8A%94-%EB%83%89%EC%9E%A5%EA%B3%A0-%EB%AC%B4%EB%A3%8C-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EB%98%90%EB%8A%94-%EB%8B%A4%EB%A5%B8-%EA%B0%9C%EC%B2%B4%EB%A5%BC%EC%9C%84%ED%95%9C-%EB%B3%B5%EC%82%AC-%EA%B3%B5%EA%B0%84-%EA%B0%80%EC%A0%95%EC%9A%A9-%EC%A0%84%EA%B8%B0-%EC%9E%A5%EB%B9%84-%ED%98%84%EB%8C%80-%EC%A3%BC%EB%B0%A9-%EC%9A%A9%ED%92%88-%EB%8D%94%EB%B8%94-%EB%8F%84%EC%96%B4%EA%B0%80%EC%9E%88%EB%8A%94-%EC%8A%A4%ED%85%8C%EC%9D%B8%EB%A0%88%EC%8A%A4-%EC%8A%A4%ED%8B%B8-%EB%83%89%EC%9E%A5%EA%B3%A0-%EB%83%89%EB%8F%99%EA%B3%A0-3d-%EB%A0%8C%EB%8D%94%EB%A7%81.jpg?s=1024x1024&w=is&k=20&c=xFHG5IF3bdYUU3DGqJBXwfVtn020YPabsXFdT0ijCA4=',
    isMulti: true,
    price: 1000000,
  },
  {
    id: '안경',
    img: 'https://cdn.pixabay.com/photo/2014/10/03/17/39/glasses-472027_1280.jpg',
    isMulti: false,
    price: 30000,
  },
  {
    id: '필통',
    img: 'https://picsum.photos/130/130',
    isMulti: true,
    price: 3000,
  },
  {
    id: '연필',
    img: 'https://media.istockphoto.com/id/1767024133/ko/%EC%82%AC%EC%A7%84/%EC%B1%85%EC%83%81-%EC%9C%84%EC%9D%98-%EB%85%B8%ED%8A%B8%EC%99%80-%ED%95%84%EA%B8%B0%EA%B5%AC-%EC%97%B0%ED%95%84%EA%BD%82%EC%9D%B4-%EC%B9%B4%ED%82%A4%EB%B2%A0%EC%9D%B4%EC%A7%80%EC%83%89-%EB%B0%B0%EA%B2%BD.jpg?s=1024x1024&w=is&k=20&c=I40SnUF7AiG6DIyRQ84SbpQuRsZ5Xx7lyfHTj3QWvN4=',
    isMulti: false,
    price: 1000,
  },
  {
    id: '에어팟',
    img: 'https://cdn.pixabay.com/photo/2020/05/14/09/54/earphones-5193970_1280.jpg',
    isMulti: false,
    price: 200000,
  },
  {
    id: '신발',
    img: 'https://media.istockphoto.com/id/1629114862/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%94%ED%83%95%EC%97%90-%ED%9D%B0%EC%83%89-%EC%9A%B4%EB%8F%99%ED%99%94%EB%A5%BC-%ED%81%B4%EB%A1%9C%EC%A6%88%EC%97%85%ED%95%A9%EB%8B%88%EB%8B%A4.jpg?s=1024x1024&w=is&k=20&c=JbgioDYSo5ZfqaBXaRR5VNIz5L-qfioD2zTC8ok-SBg=',
    isMulti: true,
    price: 90000,
  },
  {
    id: '청바지',
    img: 'https://cdn.pixabay.com/photo/2014/08/26/21/49/jeans-428614_1280.jpg',
    isMulti: true,
    price: 50000,
  },
];

const myProfile = {
  id: '프로그래머스 1기',
  name: 'BONG',
  profileImg: 'https://avatar.iran.liara.run/public',
};

const MyPage = () => {
  const renderItem = ({item}) => (
    <SafeAreaView>
      <View style={styles.itemContainer}>
        <Image source={{uri: item.img}} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.id}</Text>
          <Text
            style={styles.itemPrice}>{`₩${item.price.toLocaleString()}`}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* 사용자 프로필 정보 표시 */}
      <View style={styles.profileContainer}>
        <Image
          source={{uri: myProfile.profileImg}}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{myProfile.name}</Text>
        <Text style={styles.profileId}>{`이름: ${myProfile.id}`}</Text>
      </View>

      {/* 거래 내역 리스트 */}
      <FlatList
        data={dummy_search}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  profileId: {
    fontSize: 16,
    color: 'grey',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  itemInfo: {
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    color: 'grey',
  },
});

export default MyPage;
