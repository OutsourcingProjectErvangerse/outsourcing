import React from 'react';
import styled from 'styled-components';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from '../shared/store/modules/list';
import { useNavigate } from 'react-router-dom';

function Location() {
  const [isCursor, setIsCursor] = useState(false);
  const [infoWindow, setInfoWindow] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [result, setResult] = useState('');
  const [markers, setMarkers] = useState([]);

  const [map, setMap] = useState(null);

  const searchSelector = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //MAP 정상 작동 여부
    if (!map) return;
    //장소 및 지역 검색
    const ps = new kakao.maps.services.Places();

    // const options = {
    //   location: new kakao.maps.LatLng(location.center.lat, location.center.lng),
    //   sort: kakao.maps.services.SortBy.DISTANCE //Distance: 거리순, accuracy: 정확도 순
    // };

    //searchSelector: 검색한 키워드
    ps.keywordSearch(searchSelector, placeSearchHandler);
  }, [searchSelector]);

  //검색 결과 처리
  const placeSearchHandler = (data, status, _pagination) => {
    dispatch(addList(data));

    if (status === kakao.maps.services.Status.OK) {
      // LatLngBounds 객체에 좌표를 추가
      const bounds = new kakao.maps.LatLngBounds();

      // 검색된 장소에 대해 마커를 생성하고 지도 범위에 추가
      const markers = data.map((item) => {
        //장소의 경로
        const position = { lat: item.y, lng: item.x };

        //지도의 범위 설정
        bounds.extend(new kakao.maps.LatLng(item.y, item.x));

        return {
          position,
          place_name: item.place_name,
          id: item.id,
          address_name: item.address_name,
          category: item.category_group_name
        };
      });

      //지도 범위를 재설정
      map.setBounds(bounds);

      //지도에 표시된 마커스 상태 변경
      setMarkers(markers);
    }
  };

  const onClickEventHandler = (marker) => {
    console.log('test', marker);

    setIsClick(true);
    setResult(marker);
  };

  return (
    <StSection>
      <Map
        center={{ lat: 37.566826, lng: 126.9786567 }}
        style={{
          width: '100%',
          height: '100%'
        }}
        level={3}
        onCreate={setMap}
        onClick={() => setIsClick(false)}
      >
        {markers.map((marker) => (
          <CustomOverlayMap key={marker.id} position={marker.position}>
            <MapMarker
              position={marker.position}
              onMouseOver={() => {
                setIsCursor(true);
                setInfoWindow(marker);
              }}
              onMouseOut={() => setIsCursor(false)}
              clickable={true}
              onClick={() => onClickEventHandler(marker)}
            >
              {isClick && result.id === marker.id ? (
                <StMarkerClickDiv>
                  <p>식당이름:{marker.place_name}</p>
                  <p>주소:{marker.address_name}</p>
                  <p>카테고리: {marker.category}</p>
                </StMarkerClickDiv>
              ) : isCursor && infoWindow.id === marker.id ? (
                <StMarkerCursorDiv>
                  <p>{marker.place_name}</p>
                </StMarkerCursorDiv>
              ) : null}
            </MapMarker>
          </CustomOverlayMap>
        ))}
      </Map>
    </StSection>
  );
}

export default Location;

const StSection = styled.section`
  width: 60%;
  height: 100%;
  font-size: 15px;
  & * {
    border: none !important;
    border-radius: 10px;
  }
`;

const StMarkerCursorDiv = styled.div`
  border-radius: 15px;
  padding: 10px;
`;

const StMarkerClickDiv = styled.div`
  border-radius: 10px;
  padding: 30px;
`;
