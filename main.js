let pairs = [];

let list = document.getElementById('list');
let addPairButton = document.getElementById('addPairButton');
let input = document.querySelector('input');
let deletePairButton = document.getElementById('deletePairButton');
let sortByName = document.getElementById('sortByName');
let sortByValue = document.getElementById('sortByValue');
let showXml = document.getElementById('showXml');

addPairButton.addEventListener('click', () => {
  let validPair = [];

  let isForbiddenSymbol = /[!@#$%^&*()_+\-\[\]{};':"\\|,.<>\/?]+/;
  let errorMessage = 'Please enter a pair in a correct format';

  let testResult = isForbiddenSymbol.test(input.value);

  if (input.value.length === 0 || testResult === true) {
    alert(errorMessage);
    return;
  }

  if (input.value.length > 0 && input.value.includes('=')) {
    validPair.push(input.value);
  } else {
    alert(errorMessage);
  }

  for (let i = 0; i < validPair.length; i++) {
    let splitedPairs = validPair[i].split('=');
    let name = splitedPairs[0].trim();
    let value = splitedPairs[1].trim();

    if (input.value.length > 0 && value) {
      pairs.push(`${name}=${value}`);
    } else {
      alert(errorMessage);
    }
  }

  input.value = '';
  addPairs();
});

function addPairs() {
  let liItem = pairs.map(pair => `<li>${pair}</li>`).join('\n');
  list.innerHTML = liItem;
}

deletePairButton.addEventListener('click', (e) => {
  e.preventDefault();
  deletePairs();
});

function deletePairs() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

sortByName.addEventListener('click', (e) => {
  e.preventDefault();
  sortPairsByName();
});

function sortPairsByName() {
  let sortedByName = pairs.sort().map(pair => `<li>${pair}</li>`).join('\n');
  list.innerHTML = sortedByName;
}

sortByValue.addEventListener('click', (e) => {
  e.preventDefault();
  sortPairsByValue();
});

function sortPairsByValue() {
  let arr = [];

  for (let i = 0; i < pairs.length; i++) {
    let splitedPairs = pairs[i].split('=');
    let name = splitedPairs[0];
    let value = splitedPairs[1];

    arr.push(`${name}=${value}`);
  }

  let sortByValue = arr.sort().map(pair => {
    let reversedPair = pair.split('=').reverse().join('=');
    let reversedAgain = reversedPair.split('=').reverse().join('=').toLocaleLowerCase();

    return `<li>${reversedAgain}</li>`;
  })

  list.innerHTML = sortByValue.toString().replaceAll(',', '');
}

showXml.addEventListener('click', (e) => {
  e.preventDefault();

  list.innerText = pairs.map(pair => `<trkpt><el>${pair}</el></trkpt>`).join('\n');
})
