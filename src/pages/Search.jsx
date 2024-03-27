import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

const searchIcon = require('../assets/icons/search.png');
const multiPhoto = require('../assets/icons/multiPhoto.png');

const dummy_search = [
  {
    id: '노트북',
    img: 'https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_1280.jpg',
    isMulti: true,
  },
  {
    id: '티비',
    img: 'https://media.istockphoto.com/id/1467715632/ko/%EC%82%AC%EC%A7%84/%EA%B1%B0%EC%8B%A4%EC%9D%98-tv-%ED%99%94%EB%A9%B4-%EB%AA%A8%ED%98%95-3d-%EB%A0%8C%EB%8D%94%EB%A7%81.jpg?s=1024x1024&w=is&k=20&c=5I-k5dYA_jV_uvoHdioWTni1V9y3JaNH-rbUQKVJyzA=',
    isMulti: false,
  },
  {
    id: '냉장고',
    img: 'https://media.istockphoto.com/id/1399160717/ko/%EC%82%AC%EC%A7%84/%EB%B9%88-%EB%B0%A9%EC%97%90-%EC%84%9C%EC%9E%88%EB%8A%94-%EB%83%89%EC%9E%A5%EA%B3%A0-%EB%AC%B4%EB%A3%8C-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EB%98%90%EB%8A%94-%EB%8B%A4%EB%A5%B8-%EA%B0%9C%EC%B2%B4%EB%A5%BC%EC%9C%84%ED%95%9C-%EB%B3%B5%EC%82%AC-%EA%B3%B5%EA%B0%84-%EA%B0%80%EC%A0%95%EC%9A%A9-%EC%A0%84%EA%B8%B0-%EC%9E%A5%EB%B9%84-%ED%98%84%EB%8C%80-%EC%A3%BC%EB%B0%A9-%EC%9A%A9%ED%92%88-%EB%8D%94%EB%B8%94-%EB%8F%84%EC%96%B4%EA%B0%80%EC%9E%88%EB%8A%94-%EC%8A%A4%ED%85%8C%EC%9D%B8%EB%A0%88%EC%8A%A4-%EC%8A%A4%ED%8B%B8-%EB%83%89%EC%9E%A5%EA%B3%A0-%EB%83%89%EB%8F%99%EA%B3%A0-3d-%EB%A0%8C%EB%8D%94%EB%A7%81.jpg?s=1024x1024&w=is&k=20&c=xFHG5IF3bdYUU3DGqJBXwfVtn020YPabsXFdT0ijCA4=',
    isMulti: true,
  },
  {
    id: '안경',
    img: 'https://cdn.pixabay.com/photo/2014/10/03/17/39/glasses-472027_1280.jpg',
    isMulti: false,
  },
  {
    id: '필통',
    img: 'https://picsum.photos/130/130',
    isMulti: true,
  },
  {
    id: '연필',
    img: 'https://media.istockphoto.com/id/1767024133/ko/%EC%82%AC%EC%A7%84/%EC%B1%85%EC%83%81-%EC%9C%84%EC%9D%98-%EB%85%B8%ED%8A%B8%EC%99%80-%ED%95%84%EA%B8%B0%EA%B5%AC-%EC%97%B0%ED%95%84%EA%BD%82%EC%9D%B4-%EC%B9%B4%ED%82%A4%EB%B2%A0%EC%9D%B4%EC%A7%80%EC%83%89-%EB%B0%B0%EA%B2%BD.jpg?s=1024x1024&w=is&k=20&c=I40SnUF7AiG6DIyRQ84SbpQuRsZ5Xx7lyfHTj3QWvN4=',
    isMulti: false,
  },
  {
    id: '에어팟',
    img: 'https://cdn.pixabay.com/photo/2020/05/14/09/54/earphones-5193970_1280.jpg',
    isMulti: false,
  },
  {
    id: '티비',
    img: 'https://cdn.pixabay.com/photo/2016/11/30/08/46/living-room-1872192_1280.jpg',
    isMulti: true,
  },
  {
    id: '신발',
    img: 'https://media.istockphoto.com/id/1629114862/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%94%ED%83%95%EC%97%90-%ED%9D%B0%EC%83%89-%EC%9A%B4%EB%8F%99%ED%99%94%EB%A5%BC-%ED%81%B4%EB%A1%9C%EC%A6%88%EC%97%85%ED%95%A9%EB%8B%88%EB%8B%A4.jpg?s=1024x1024&w=is&k=20&c=JbgioDYSo5ZfqaBXaRR5VNIz5L-qfioD2zTC8ok-SBg=',
    isMulti: true,
  },
  {
    id: '청바지',
    img: 'https://cdn.pixabay.com/photo/2014/08/26/21/49/jeans-428614_1280.jpg',
    isMulti: true,
  },
];

const Search = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const {width, height} = useWindowDimensions();

  // 현재d값으로 필터 했습니다. ex(가방, 티비 ) 등등

  const filteredData =
    keyword.trim().length > 0
      ? dummy_search.filter(item => item.id.toString().includes(keyword))
      : [];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={{borderWidth: 1, borderColor: '#FFF'}}>
        {item.isMulti && (
          <Image
            source={multiPhoto}
            style={{
              position: 'absolute',
              right: 8,
              top: 9,
              width: 25,
              height: 25,
              zIndex: 4,
            }}
          />
        )}
        <Image
          source={{uri: item.img}}
          style={{width: width / 3, height: width / 3}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={{flex: 1}}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TouchableOpacity style={styles.searchIconStyle}>
              <Image source={searchIcon} style={{width: 24, height: 24}} />
            </TouchableOpacity>
            <TextInput
              placeholder="검색어를 입력하세요"
              placeholderTextColor={'#828282'}
              spellCheck={false}
              autoCorrect={false}
              autoCapitalize="none"
              autoFocus={true}
              value={keyword}
              onChangeText={text => setKeyword(text)}
              allowFontScaling={false}
              style={styles.inputStyle}
            />
          </View>
        </View>

        <FlatList
          data={filteredData} // 여기를 filteredData로 변경하여 필터링된 결과만 표시합니다.
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()} // id를 문자열로 변환합니다.
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 68,
    backgroundColor: '#FFF',
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 4,
  },
  searchIconStyle: {
    marginLeft: 16,
    marginRight: 2,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '400',
    color: '#828282',
    paddingRight: 12,
  },
});

export default Search;
