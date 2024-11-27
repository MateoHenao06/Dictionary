import { dictionary } from './dictionary.js';

document.getElementById('sortButton').addEventListener('click', function () {
  const selectedCategory = document.querySelector('input[name="category"]:checked')?.value;
  const order = document.getElementById('orderSelect').value;
  let words;
  if (selectedCategory) {
    words = [...dictionary.categories[selectedCategory]];
  } else {
    words = Object.values(dictionary.categories).flat();
  }
  const sortedWords = words.sort((a, b) => 
    a[order === 'en-es' ? 'english' : 'spanish'].toLowerCase().localeCompare(b[order === 'en-es' ? 'english' : 'spanish'].toLowerCase())
  );
  renderDictionary(sortedWords, order);
});

document.querySelectorAll('input[name="category"]').forEach(radio => {
  radio.addEventListener('change', function () {
    const category = this.value;
    const order = document.getElementById('orderSelect').value;
    renderDictionary(dictionary.categories[category], order);  // Mostrar palabras sin ordenar
  });
});

document.getElementById('resetButton').addEventListener('click', function () {
  const allWords = Object.values(dictionary.categories).flat();
  const order = document.getElementById('orderSelect').value;
  renderDictionary(allWords, order);
  // Desmarcar cualquier categoría seleccionada
  document.querySelectorAll('input[name="category"]').forEach(radio => radio.checked = false);
});

document.getElementById('orderSelect').addEventListener('change', function () {
  const selectedCategory = document.querySelector('input[name="category"]:checked')?.value;
  const order = document.getElementById('orderSelect').value;
  let words;
  if (selectedCategory) {
    words = [...dictionary.categories[selectedCategory]];
  } else {
    words = Object.values(dictionary.categories).flat();
  }
  renderDictionary(words, order);
});

function renderDictionary(words, order) {
  const tableBody = document.querySelector('#dictionaryTable tbody');
  if (tableBody) {
    tableBody.innerHTML = '';
    words.forEach(entry => {
      const row = document.createElement('tr');
      const wordCell = document.createElement('td');
      const translationCell = document.createElement('td');
      const exampleCell = document.createElement('td');
      wordCell.textContent = entry[order === 'en-es' ? 'english' : 'spanish'];
      translationCell.textContent = entry[order === 'en-es' ? 'spanish' : 'english'];
      exampleCell.textContent = entry.example;
      row.appendChild(wordCell);
      row.appendChild(translationCell);
      row.appendChild(exampleCell);
      tableBody.appendChild(row);
    });
  }
}

// Inicializa la tabla del diccionario al cargar la página con todas las palabras
const allWords = Object.values(dictionary.categories).flat();
const order = document.getElementById('orderSelect').value;
renderDictionary(allWords, order);
