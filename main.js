let pairs = [];

let list = document.getElementById('list');
let addPairButton = document.getElementById('addPairButton');
let input = document.querySelector('input');
let deletePairButton = document.getElementById('deletePairButton');
let sortByName = document.getElementById('sortByName');
let sortByValue = document.getElementById('sortByValue');
let showXml = document.getElementById('showXml');

addPairButton.addEventListener('click', () => {
  if (input.value.includes('=')) {
    pairs.push(input.value);
    input.value = '';
  } else {
    return false;
  }

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
    let reversedPair = pair.split('=').reverse().join('=')

    return `<li>${reversedPair}</li>`;
  })

  list.innerHTML = sortByValue.toString().replaceAll(',', '');
}

const toXml = (data) => {
  return data.reduce((result, el) => {
   return result + `<trkpt lat="${el.lat}" lon="${el.lon}"><ele>${el.ele}</ele></trkpt>\n`
  }, '')
}

console.log(toXml(data));
