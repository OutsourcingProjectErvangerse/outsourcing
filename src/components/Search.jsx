import { useState } from 'react';
import { PROVINCES, DISTRICTS, PLACES } from '../shared/cityData';
import { useDispatch } from 'react-redux';
import { changeSearchText } from '../shared/store/modules/search';

function Search() {
  const [seletedProvince, setSeletedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const dispatch = useDispatch();

  // 시/도 선택
  const handleSeletedProvinces = (e) => {
    setSeletedProvince(e.target.value);
  };

  // 시/군/구 선택
  const handleSeletedDistrict = (e) => {
    setSelectedDistrict(e.target.value);
  };

  // 카테고리 선택
  const handleCategoryButton = (attractions) => {
    if (!seletedProvince || !selectedDistrict) {
      alert('모든 항목을 선택해주세요.');
      return;
    }

    dispatch(changeSearchText(`${seletedProvince} ${selectedDistrict} ${attractions}`));

    setSeletedProvince('');
    setSelectedDistrict('');
  };

  let districtToggle = (
    <select>
      <option value="" hidden>
        시/군/구 선택
      </option>
      <option value="">시/도를 먼저 선택해주세요.</option>
    </select>
  );

  if (seletedProvince) {
    districtToggle = (
      <select value={selectedDistrict} onChange={handleSeletedDistrict}>
        <option value="" hidden>
          시/군/구 선택
        </option>
        {DISTRICTS[seletedProvince].map((district) => {
          return (
            <option key={district} value={district}>
              {district}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <>
      <div>
        <select value={seletedProvince} onChange={handleSeletedProvinces}>
          <option value="" hidden>
            시/도 선택
          </option>
          {PROVINCES.map((provinces) => {
            return (
              <option key={provinces.name} value={provinces.name}>
                {provinces.name}
              </option>
            );
          })}
        </select>
        {districtToggle}
      </div>
      <div>
        {PLACES.map((place) => {
          return (
            <button key={place} onClick={() => handleCategoryButton(place)}>
              {place}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Search;
