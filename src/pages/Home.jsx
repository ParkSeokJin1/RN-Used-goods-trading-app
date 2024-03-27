import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Image,
} from 'react-native';
import BasicHeader from '../components/BasicHeader';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  getAddressFromCoords,
  getCoordsFromAddress,
  getCoordsFromKeyword,
} from '../GeoUtil';
import {SingleLineInput} from '../components/SingleLineInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const addOn = require('../assets/icons/bottomtab/add_circle_off.png');

// 시뮬레이터로 서울 시청 기준으로 로케이션 잡기
const Home = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 37.560214,
    longitude: 126.9775521,
  });

  // 주소를 띄워주는 로직
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [savedItems, setSavedItems] = useState([]); // 로드된 아이템을 저장

  // 지도에서 특정영역을 꾹 눌렀을때 해당 위치로 마커 이동, 위치정보 불러오는 로직
  const onChangeLocation = useCallback(async item => {
    setCurrentRegion({
      latitude: item.latitude,
      longitude: item.longitude,
    });

    try {
      const address = await getAddressFromCoords(item.latitude, item.longitude);
      setCurrentAddress(address);
    } catch (error) {
      console.error('Error getting address:', error);
    }
  }, []);

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      onChangeLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [onChangeLocation]);

  // 주소 입력시 해당 위치로 이동, 키워드 기능 추가
  const onFindAddress = useCallback(async () => {
    const keywordResult = await getCoordsFromKeyword(query);

    if (keywordResult !== null) {
      setCurrentAddress(keywordResult.address);
      setCurrentRegion({
        latitude: keywordResult.latitude,
        longitude: keywordResult.longitude,
      });

      return;
    }

    const addressResult = await getCoordsFromAddress(query);
    if (addressResult === null) {
      console.error('주소값을 찾지 못했습니다.');
      return;
    }

    setCurrentAddress(addressResult.address);
    setCurrentRegion({
      latitude: addressResult.latitude,
      longitude: addressResult.longitude,
    });
  }, [query]);

  const onPressBottomAddress = useCallback(() => {
    navigation.navigate('추가', {
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
      address: currentAddress,
    });
  }, [
    currentAddress,
    currentRegion.latitude,
    currentRegion.longitude,
    navigation,
  ]);

  const onMapReady = useCallback(async () => {
    setIsMapReady(true);
    try {
      const itemsString = await AsyncStorage.getItem('saveData');
      if (itemsString) {
        const items = JSON.parse(itemsString);
        if (!Array.isArray(items)) {
          setSavedItems([items]); // 단일 객체라면 배열로 변환
        } else {
          setSavedItems(items); // 이미 배열이라면 직접 설정
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMyLocation();
    onMapReady(); // 컴포넌트가 마운트될 때 저장된 아이템을 로드
  }, [onMapReady, getMyLocation]);

  // 각 아이템을 표시하는 렌더 함수
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('디테일', {item: item})}
      style={{
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}>
      <Image
        source={{uri: item.selectedItem.img}} // 저장된 아이템의 이미지 URL 사용
        style={{width: 150, height: 100, marginRight: 10}}
      />
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
        <Text>{item.location.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <Pressable
        onPress={onPressBottomAddress}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BasicHeader title={currentAddress} />
        <Image source={addOn} style={{width: 24, height: 24}} />
      </Pressable>

      <MapView
        style={{height: 400}}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onMapReady={onMapReady}
        onLongPress={event => onChangeLocation(event.nativeEvent.coordinate)}>
        {isMapReady && (
          <Marker
            coordinate={{
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude,
            }}
          />
        )}

        {isMapReady &&
          savedItems.map(item => {
            return (
              <Marker
                title={item.title}
                description={item.location.address}
                coordinate={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                }}
                pinColor="blue"
              />
            );
          })}
      </MapView>

      <View style={{position: 'absolute', top: 120, left: 24, right: 24}}>
        <View style={{backgroundColor: 'white'}}>
          <SingleLineInput
            value={query}
            placeholder="주소를 입력해주세요"
            onChangeText={setQuery}
            onSubmitEditing={onFindAddress}
          />
        </View>
      </View>

      {/* 저장된 아이템을 표시하는 FlatList */}

      <FlatList
        data={savedItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.toString()}
      />
    </SafeAreaView>
  );
};

export default Home;
