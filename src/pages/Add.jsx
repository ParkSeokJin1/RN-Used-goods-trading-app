import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import BasicHeader from '../components/BasicHeader';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';
import {SingleLineInput} from '../components/SingleLineInput';
import MapView, {Marker} from 'react-native-maps';
import {Button} from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dummy_search = [
  {
    name: '노트북',
    img: 'https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_1280.jpg',
    isMulti: true,
  },
  {
    name: '티비',
    img: 'https://media.istockphoto.com/id/1467715632/ko/%EC%82%AC%EC%A7%84/%EA%B1%B0%EC%8B%A4%EC%9D%98-tv-%ED%99%94%EB%A9%B4-%EB%AA%A8%ED%98%95-3d-%EB%A0%8C%EB%8D%94%EB%A7%81.jpg?s=1024x1024&w=is&k=20&c=5I-k5dYA_jV_uvoHdioWTni1V9y3JaNH-rbUQKVJyzA=',
    isMulti: false,
  },
  {
    name: '냉장고',
    img: 'https://media.istockphoto.com/id/1399160717/ko/%EC%82%AC%EC%A7%84/%EB%B9%88-%EB%B0%A9%EC%97%90-%EC%84%9C%EC%9E%88%EB%8A%94-%EB%83%89%EC%9E%A5%EA%B3%A0-%EB%AC%B4%EB%A3%8C-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EB%98%90%EB%8A%94-%EB%8B%A4%EB%A5%B8-%EA%B0%9C%EC%B2%B4%EB%A5%BC%EC%9C%84%ED%95%9C-%EB%B3%B5%EC%82%AC-%EA%B3%B5%EA%B0%84-%EA%B0%80%EC%A0%95%EC%9A%A9-%EC%A0%84%EA%B8%B0-%EC%9E%A5%EB%B9%84-%ED%98%84%EB%8C%80-%EC%A3%BC%EB%B0%A9-%EC%9A%A9%ED%92%88-%EB%8D%94%EB%B8%94-%EB%8F%84%EC%96%B4%EA%B0%80%EC%9E%88%EB%8A%94-%EC%8A%A4%ED%85%8C%EC%9D%B8%EB%A0%88%EC%8A%A4-%EC%8A%A4%ED%8B%B8-%EB%83%89%EC%9E%A5%EA%B3%A0-%EB%83%89%EB%8F%99%EA%B3%A0-3d-%EB%A0%8C%EB%8D%94%EB%A7%81.jpg?s=1024x1024&w=is&k=20&c=xFHG5IF3bdYUU3DGqJBXwfVtn020YPabsXFdT0ijCA4=',
    isMulti: true,
  },
  {
    name: '안경',
    img: 'https://cdn.pixabay.com/photo/2014/10/03/17/39/glasses-472027_1280.jpg',
    isMulti: false,
  },
  {
    name: '필통',
    img: 'https://picsum.photos/130/130',
    isMulti: true,
  },
  {
    name: '연필',
    img: 'https://media.istockphoto.com/id/1767024133/ko/%EC%82%AC%EC%A7%84/%EC%B1%85%EC%83%81-%EC%9C%84%EC%9D%98-%EB%85%B8%ED%8A%B8%EC%99%80-%ED%95%84%EA%B8%B0%EA%B5%AC-%EC%97%B0%ED%95%84%EA%BD%82%EC%9D%B4-%EC%B9%B4%ED%82%A4%EB%B2%A0%EC%9D%B4%EC%A7%80%EC%83%89-%EB%B0%B0%EA%B2%BD.jpg?s=1024x1024&w=is&k=20&c=I40SnUF7AiG6DIyRQ84SbpQuRsZ5Xx7lyfHTj3QWvN4=',
    isMulti: false,
  },
  {
    name: '에어팟',
    img: 'https://cdn.pixabay.com/photo/2020/05/14/09/54/earphones-5193970_1280.jpg',
    isMulti: false,
  },
  {
    name: '티비',
    img: 'https://cdn.pixabay.com/photo/2016/11/30/08/46/living-room-1872192_1280.jpg',
    isMulti: true,
  },
  {
    name: '신발',
    img: 'https://media.istockphoto.com/id/1629114862/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%94%ED%83%95%EC%97%90-%ED%9D%B0%EC%83%89-%EC%9A%B4%EB%8F%99%ED%99%94%EB%A5%BC-%ED%81%B4%EB%A1%9C%EC%A6%88%EC%97%85%ED%95%A9%EB%8B%88%EB%8B%A4.jpg?s=1024x1024&w=is&k=20&c=JbgioDYSo5ZfqaBXaRR5VNIz5L-qfioD2zTC8ok-SBg=',
    isMulti: true,
  },
  {
    name: '청바지',
    img: 'https://cdn.pixabay.com/photo/2014/08/26/21/49/jeans-428614_1280.jpg',
    isMulti: true,
  },
];

const Add = ({route, navigation}) => {
  const {latitude, longitude, address} = route.params;
  const [title, setTitle] = useState('');
  // 선택한 아이템 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedItem(item)}
        style={index === 0 ? {marginHorizontal: 16} : {marginRight: 16}}>
        <Image source={{uri: item.img}} style={{width: 60, height: 60}} />
        <Text
          numberOfLines={1}
          style={{
            maxWidth: 52,
            fontSize: 13,
            fontWeight: '400',
            lineHeight: 16.22,
            color: '#4F4F4F',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const onPressSave = useCallback(async () => {
    if (title && selectedItem) {
      try {
        const saveData = JSON.stringify({
          title,
          selectedItem,
          location: {
            latitude,
            longitude,
            address,
          },
        });

        await AsyncStorage.setItem('saveData', saveData);
        Alert.alert('저장 완료', '데이터가 성공적으로 저장되었습니다.');
        setTitle('');
        setSelectedItem(null);
      } catch (error) {
        Alert.alert('저장 실패', '데이터 저장에 실패했습니다.');
      }
    } else {
      Alert.alert('입력 필요', '제목과 아이템을 모두 선택해주세요.');
    }

    navigation.goBack();
  }, [title, selectedItem, latitude, longitude, address]);

  return (
    <View style={{flex: 1}}>
      <BasicHeader title="물품 등록 페이지" />

      <View style={{flex: 1, paddingTop: 24, paddingHorizontal: 24}}>
        <Typography fontSize={16}>제목</Typography>
        <Spacer space={8} />
        <SingleLineInput
          value={title}
          placeholder="내용을 입력하세요"
          onChangeText={setTitle}
        />
        {/* 물품 FlatList로 나열 */}
        <View style={{padding: 16}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}></View>
          </View>
          <View>
            <FlatList
              data={dummy_search}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews
            />
          </View>
        </View>

        <Spacer space={24} />
        <Typography fontSize={16}>주소</Typography>
        <Spacer space={8} />
        <Typography fontSize={18}>{address}</Typography>
        <Spacer space={24} />
        <Typography fontSize={16}>위치</Typography>
        <Spacer space={8} />
        <MapView
          style={{height: 150}}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.003,
          }}>
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          />
        </MapView>

        <Spacer space={30} />

        <Button onPress={onPressSave}>
          <View
            style={{
              backgroundColor: title === '' ? 'gray' : 'black',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="white">
              저장하기
            </Typography>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default Add;
