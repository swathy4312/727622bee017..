
const windowSize = 10;
let storedNumbers = [];

function simulateFetchFromServer(type) {
  const datasets = {
    p: [2, 3, 5, 7],
    f: [1, 1, 2, 3],
    e: [2, 4, 6, 8],
    r: [3, 9, 1, 5]
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(datasets[type] || []);
    }, Math.random() * 300 + 100); // simulate <500ms response
  });
}

async function fetchNumbers() {
  const type = document.getElementById("type").value;
  if (!['p', 'f', 'e', 'r'].includes(type)) {
    alert("Invalid input. Use 'p', 'f', 'e', or 'r'.");
    return;
  }

  const newNumbers = await simulateFetchFromServer(type);
  const uniqueNumbers = [...new Set(newNumbers.filter(n => !storedNumbers.includes(n)))];
  storedNumbers.push(...uniqueNumbers);

  while (storedNumbers.length > windowSize) {
    storedNumbers.shift();
  }

  const avg = (storedNumbers.reduce((a, b) => a + b, 0) / storedNumbers.length).toFixed(2);

  const response = {
    windowPrevState: storedNumbers.slice(0, storedNumbers.length - uniqueNumbers.length),
    windowCurrState: [...storedNumbers],
    numbers: newNumbers,
    avg: parseFloat(avg)
  };

  document.getElementById("response").textContent = JSON.stringify(response, null, 2);
}
