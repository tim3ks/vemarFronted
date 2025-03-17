<script setup>
const props = defineProps({
  opcje: { type: Object },
});

const items = Object.keys(props.opcje);

function znajdzPodobneElementy(array1, array2) {
  const podobneElementy = [];

  // Iteruj przez wszystkie elementy pierwszej tablicy
  array1.forEach((element1) => {
    // Iteruj przez wszystkie elementy drugiej tablicy
    array2.forEach((element2) => {
      // Sprawdź, czy nazwy elementów różnią się tylko w kilku znakach
      if (jestPodobne(element1, element2)) {
        // Jeśli tak, dodaj je do tablicy podobnych elementów
        podobneElementy.push(
          `${element2}: ${
            props.opcje[element1] === true ? "Tak" : props.opcje[element1]
          }`
        );
      }
    });
  });

  return podobneElementy;
}

// Funkcja sprawdzająca, czy dwie nazwy są podobne
function jestPodobne(nazwa1, nazwa2) {
  // Załóżmy, że nazwy są podobne, jeśli różnią się tylko w jednym znaku
  // można zaimplementować bardziej zaawansowane metody porównywania
  let rozneZnaki = 0;
  for (let i = 0; i < Math.min(nazwa1.length, nazwa2.length); i++) {
    if (nazwa1[i] !== nazwa2[i]) {
      rozneZnaki++;
    }
    if (rozneZnaki > 1) {
      return false;
    }
  }
  return rozneZnaki === 1;
}

// Przykładowe dane wejściowe

const wszystkieOpcje = [
  "Kot",
  "Kolor",
  "Odwrotny montaz",
  "Blaszka",
  "Zawias",
  "Typ Zawiasu",
  "Kratka",
];

// Wywołanie funkcji i wyświetlenie wyniku
const podobne = znajdzPodobneElementy(items, wszystkieOpcje);
console.log(podobne); // Wynik: [ [ 'kot', 'kotek' ], [ 'kolor', 'kalor' ], [ 'odwrotnyMontaz', 'drwrotnyMontaz' ] ]
</script>

<template>
  <div>{{ items }}</div>
</template>