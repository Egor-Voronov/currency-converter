<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currencyStore'

const currencyStore = useCurrencyStore()

currencyStore.fetchData()
</script>

<template>
  <div class="converterContainer">
    <h1 class="converterHeading">Конвертер валют</h1>
    <div v-if="currencyStore.loadingError">Ошибка при загрузке данных.</div>
    <div v-else>
      <div v-if="currencyStore.responseValute === null">Loading...</div>
      <div v-else>
        <input
          type="number"
          class="converterInput"
          v-model="currencyStore.selectedCurrencyAmount"
          placeholder="Введите сумму"
          @input="currencyStore.convertCurrency"
          @focus="$event.target.select()"
        />
        <select
          class="converterSelect"
          v-model="currencyStore.selectedCurrency"
          @change="currencyStore.convertCurrency"
        >
          <option
            v-for="(valute, key) in currencyStore.responseValute"
            :key="key"
            :value="valute.CharCode"
          >
            {{ valute.CharCode }} ({{ valute.Name }})
          </option>
        </select>
        <input
          type="number"
          class="converterInput"
          v-model="currencyStore.baseCurrencyAmount"
          @input="currencyStore.convertBaseCurrency"
          @focus="$event.target.select()"
        />
        ₽
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.converterContainer {
  background-color: red;
  width: 16rem;
  height: auto;
}

.converterInput[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
