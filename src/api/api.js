import axios from 'axios';

const URL_SMALL = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
const URL_BIG = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

export function loadBig(callback, errorCallback) {
  fetchBig()
    .then(
      res => callback(res.data),
      error => errorCallback(error.toString())
    );
}

export function loadSmall(callback, errorCallback) {
  fetchSmall()
    .then(
      res => callback(res.data),
      error => errorCallback(error.toString())
    );
}

export function loadHuge(callback, errorCallback) {
  const data = [];
  const loads = [];
  for (let i = 0; i < 100; i++) {
    loads.push(fetchBig())
  }
  axios.all(loads).then(
    axios.spread((...results) => {
      results.forEach(res => data.push(...res.data))
    }),
    error => errorCallback(error.toString())
  )
    .then(
      () => callback(data),
      error => errorCallback(error.toString())
    )
}

function fetchBig() {
  return axios.get(URL_BIG)
}

function fetchSmall() {
  return axios.get(URL_SMALL)
}