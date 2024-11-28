export const dictionary = getDictionaryFromLocalStorage();

function getDictionaryFromLocalStorage() {
  const dictionaryFromStorage = JSON.parse(localStorage.getItem('dictionary')) || { categories: {} };
  return dictionaryFromStorage;
}

function saveDictionaryToLocalStorage(dictionary) {
  localStorage.setItem('dictionary', JSON.stringify(dictionary));
}