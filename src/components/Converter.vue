<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currencyStore'

const currencyStore = useCurrencyStore()

currencyStore.fetchData()
</script>

<template>
  <div class="converterContainer">
    <h1 class="converterHeading">Конвертер валют</h1>
    <div v-if="currencyStore.loadingError" class="converterHeading">
      Ошибка при загрузке данных.
    </div>
    <div v-else>
      <div v-if="currencyStore.responseValute === null" class="converterHeading">Loading...</div>
      <div v-else class="converterInputs">
        <input
          type="number"
          class="converterInput"
          v-model="currencyStore.selectedCurrencyAmount"
          placeholder="Введите сумму"
          @input="currencyStore.convertCurrency"
          n
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
        <div>
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
  </div>
</template>

<style scoped lang="scss">
// variables
@mixin _mobile {
  @media (max-width: 820px) {
    @content;
  }
}

%baseFields {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;

  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;

  width: 33rem;

  @include _mobile {
    width: 90%;
  }
}

.converter {
  &Container {
    background-color: #fff;
    width: 36rem;
    height: auto;
    border-radius: 5px;

    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @include _mobile {
      width: 90%;
    }
  }
  &Heading {
    font-family: 'Inter', sans-serif;
    font-weight: 500;

    margin-top: 1rem;
  }
  &Inputs {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;

    margin: 1rem 1rem;

    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 300;
  }
  &Input {
    @extend %baseFields;

    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:last-child {
      width: 32rem;
      @include _mobile {
        width: 90%;
      }
    }
  }
  &Select {
    @extend %baseFields;
  }
}
</style>
