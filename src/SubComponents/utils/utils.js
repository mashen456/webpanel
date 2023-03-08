export const searchByName = (listData, searchValue) => {
  if (searchValue.length > 0) {
    let searchResult = listData.filter(item => item.name.toLocaleLowerCase().match(searchValue.toLowerCase()));
    if (searchResult.length < 1){
      searchResult = listData.filter(item => item.position.toLocaleLowerCase().match(searchValue.toLowerCase()));
    }
    if (searchResult.length < 1){
      searchResult = listData.filter(item => item.ownerId.toLocaleLowerCase().match(searchValue.toLowerCase()));
    }
    if (searchResult.length < 1){
      searchResult = listData.filter(item => item.owner.toLocaleLowerCase().match(searchValue.toLowerCase()));
    }
    return searchResult;
  } else {
    return listData;
  }
};

export const searchByPlate = (listData, searchValue) => {
  if (searchValue.length > 0) {
    const searchResult = listData.filter(item => item.position.toLocaleLowerCase().match(searchValue.toLowerCase()));
    return searchResult;
  } else {
    return listData;
  }
};
export const getRoute = pathname => {
  const str = pathname.split("/");
  return `/${str[1]}`;
};