<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const responseValute = ref(null)
const loadingError = ref(false)

const selectedCurrency = ref('USD')
const selectedCurrencyAmount = ref<number | string>('0')
const baseCurrencyAmount = ref<number | string>('0')

axios
  .get('https://www.cbr-xml-daily.ru/daily_json.js')
  .then((response) => {
    responseValute.value = response.data.Valute
  })
  .catch((error) => {
    console.log(error)
    loadingError.value = true
  })

const convertCurrency = (): void => {
  const selectedCurrencyValue = parseFloat(responseValute.value[selectedCurrency.value].Value)
  baseCurrencyAmount.value = +(selectedCurrencyAmount.value * selectedCurrencyValue).toFixed(2)
}

const convertBaseCurrency = (): void => {
  const selectedCurrencyValue = parseFloat(responseValute.value[selectedCurrency.value].Value)
  selectedCurrencyAmount.value = +(baseCurrencyAmount.value / selectedCurrencyValue).toFixed(2)
}
</script>

<template>
  <div class="converterContainer">
    <h1 class="converterHeading">Конвертер валют</h1>
    <div v-if="loadingError">Ошибка при загрузке данных.</div>
    <div v-else>
      <div v-if="responseValute === null">Loading...</div>
      <div v-else>
        <input
          type="number"
          class="converterInput"
          v-model="selectedCurrencyAmount"
          placeholder="Введите сумму"
          @input="convertCurrency"
          @focus="$event.target.select()"
        />
        <select class="converterSelect" v-model="selectedCurrency" @change="convertCurrency">
          <option v-for="(valute, key) in responseValute" :key="key" :value="valute.CharCode">
            {{ valute.CharCode }} ({{ valute.Name }})
          </option>
        </select>
        <input
          type="number"
          class="converterInput"
          v-model="baseCurrencyAmount"
          @input="convertBaseCurrency"
          @focus="$event.target.select()"
        />
        ₽
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.converter {
  &Container {
    background-color: red;
    width: 16rem;
    height: auto;
  }
  &Input {
    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
