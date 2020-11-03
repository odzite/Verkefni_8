/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 *
 */
function start() {
  do {
    const type = prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“') || '';
    const typeLowered = type.toLocaleLowerCase();

    if (typeLowered !== 'kóða' && typeLowered !== 'afkóða') {
      alert(`Veit ekki hvaða aðgerð „${type}“ er. Reyndu aftur.`);
      continue;
    }

    const nInput = prompt(`Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, ${LETTERS.length - 1}]`);
    const n = Number.parseInt(nInput, 10);
    if (!Number.isInteger(n) || n < 1 || n > LETTERS.length - 1) {
      alert(`${nInput} er ekki heiltala á bilinu [1, ${LETTERS.length - 1}]. Reyndu aftur.`);
      continue;
    }

    const str = prompt(`Gefðu upp strenginn sem á að ${typeLowered} með hliðrun ${n}:`);

    if (!str || str.length === 0) {
      alert(`Þú gafst ekki upp streng. Reyndu aftur.`);
      continue;
    }

    const invalid = [];
    for (let i = 0; i < str.length; i++) {
      const letter = (str[i] || '').toLocaleUpperCase();
      if (LETTERS.indexOf(letter) < 0) {
        invalid.push(letter);
      }
    }

    if (invalid.length > 0) {
      alert(`Þú gafst upp stafi sem ekki er hægt að ${typeLowered}: ${invalid.join(', ')}. Reyndu aftur.`);
      continue;
    }

    let result = '';
    if (typeLowered === 'kóða') {
      result = encode(str, n);
    } else {
      result = decode(str, n);
    }

    alert(`Niðurstaða:\n${result}`);

  } while (confirm('Aftur?'));
}

start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  // dæmi sem notar for lykkju
  const upper = str.toLocaleUpperCase();

  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += LETTERS[(LETTERS.indexOf(upper[i]) + n) % LETTERS.length];
  }
  return result;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  // dæmi sem notar „fallaforritun“
  return str
    .toLocaleUpperCase()
    .split('')
    .map(s => LETTERS.indexOf(s) - n) // hliðruð staðsetning stafs
    .map(i => i < 0 ? LETTERS.length + i : i) // ef i verður neikvætt, förum aftast í stafróf
    .map(i => LETTERS[i])
    .join('');
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');


const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  function init(el) {
    // Setja event handlera á viðeigandi element
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});

const staf = document.querySelector('alphabet');
const input = document.querySelector('input[type=text]');
