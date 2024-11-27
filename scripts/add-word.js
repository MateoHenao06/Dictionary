import { dictionary } from './dictionary.js';

document.getElementById('addWordButton').addEventListener('click', function () {
  const newWordEn = document.getElementById('newWordEn').value.trim();
  const newWordEs = document.getElementById('newWordEs').value.trim();
  const newWordExample = document.getElementById('newWordExample').value.trim();
  const newWordCategory = document.getElementById('newWordCategory').value;

  // Validar campos vacíos
  if (!newWordEn || !newWordEs || !newWordExample) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  // Validar existencia de la palabra
  const wordExists = dictionary.categories[newWordCategory].some(entry => 
    entry.english.toLowerCase() === newWordEn.toLowerCase() || entry.spanish.toLowerCase() === newWordEs.toLowerCase()
  );

  if (wordExists) {
    alert('La palabra ya existe en el diccionario.');
    return;
  }

  // Generar ID único
  const newId = dictionary.categories[newWordCategory].length > 0 ? Math.max(...dictionary.categories[newWordCategory].map(word => word.id)) + 1 : 1;
  const newWord = {
    id: newId,
    english: newWordEn,
    spanish: newWordEs,
    example: newWordExample
  };
  dictionary.categories[newWordCategory].push(newWord);
  alert('Palabra añadida correctamente.');
  
  // Actualizar el diccionario inmediatamente
  updateDictionary();
});

function updateDictionary() {
  const order = 'en-es';  // Ordenar en inglés-español por defecto
  const allWords = Object.values(dictionary.categories).flat();
  renderDictionary(allWords, order);
}

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

