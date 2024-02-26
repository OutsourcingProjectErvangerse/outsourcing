import React from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from '../shared/store/modules/list';

function Location() {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState('');
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [keyword, onChangeKeywordHandler] = useInput();
  const dispatch = useDispatch();

  useEffect(() => {
    //MAP 정상 작동 여부
    if (!map) return;

    //장소 및 지역 검색
    const ps = new kakao.maps.services.Places();

    //"이태원" => searchSelector값 가져오기
    ps.keywordSearch(`이태원`, placeSearchHandler);
  }, [map]);

  const placeSearchHandler = (data, status, _pagination) => {
    dispatch(addList(data));
    //장소 검색이 정상적으로 호출 되었을 때
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      const bounds = new kakao.maps.LatLngBounds();

      // 검색된 각 장소에 대해 마커를 생성하고 지도 범위에 추가
      const markers = data.map((item) => {
        //장소의 x,y 경로
        const position = { lat: item.y, lng: item.x };

        //지도의 범위를 설정
        bounds.extend(new kakao.maps.LatLng(item.y, item.x));

        return { position, content: item.place_name };
      });

      //지도에 표시된 마커스 상태 변경
      setMarkers(markers);

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  };

  const onSubmitClickEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <StSection>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567
        }}
        style={{
          width: '100%',
          height: '100%'
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onMouseOver={() => {
              setIsOpen(true);
              setInfo(marker);
            }}
            onMouseOut={() => setIsOpen(false)}
          >
            {isOpen && info.content === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
          </MapMarker>
        ))}
      </Map>
    </StSection>
  );
}

export default Location;

const StSection = styled.section`
  width: 60%;
  height: 100%;
  background-color: purple;
`;
