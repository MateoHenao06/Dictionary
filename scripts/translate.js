import { dictionary } from './dictionary.js';

document.getElementById('translateButton').addEventListener('click', function () {
  const word = document.getElementById('wordInput').value.trim().toLowerCase();
  const lang = document.getElementById('languageSelect').value;

  let translation = null;
  for (const category in dictionary.categories) {
    translation = dictionary.categories[category].find(entry => (lang === 'en-es' ? entry.english.toLowerCase() : entry.spanish.toLowerCase()) === word);
    if (translation) break;
  }

  const resultTable = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
  resultTable.innerHTML = '';  // Limpiar tabla antes de mostrar nuevo resultado

  if (translation) {
    const row = resultTable.insertRow();
    row.insertCell(0).textContent = lang === 'en-es' ? translation.english : translation.spanish;
    row.insertCell(1).textContent = lang === 'en-es' ? translation.spanish : translation.english;
    row.insertCell(2).textContent = translation.example;
  } else {
    alert('Palabra no encontrada en el diccionario.');
  }
});
