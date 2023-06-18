import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Valute } from './currencyStore.types'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    responseValute: ref<Valute | null>(null),
    loadingError: ref(false),
    selectedCurrency: ref(localStorage.getItem('selectedCurrency') || 'USD'),
    selectedCurrencyAmount: ref<number | string>(
      localStorage.getItem('selectedCurrencyAmount') || '0'
    ),
    baseCurrencyAmount: ref<number | string>(localStorage.getItem('baseCurrencyAmount') || '0')
  }),

  actions: {
    async fetchData() {
      try {
        const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
        this.responseValute = response.data.Valute
      } catch (error) {
        console.log(error)
        this.loadingError = true
      }
    },

    convertCurrency() {
      if (this.responseValute !== null) {
        const selectedCurrencyValue = parseFloat(this.responseValute[this.selectedCurrency].Value)
        const selectedCurrencyAmount = this.selectedCurrencyAmount
        this.baseCurrencyAmount = (+selectedCurrencyAmount * selectedCurrencyValue).toFixed(2)
        this.saveDataToStorage()
      }
    },

    convertBaseCurrency() {
      if (this.responseValute !== null) {
        const selectedCurrencyValue = parseFloat(this.responseValute[this.selectedCurrency].Value)
        const baseCurrencyAmount = this.baseCurrencyAmount
        this.selectedCurrencyAmount = (+baseCurrencyAmount / selectedCurrencyValue).toFixed(2)
        this.saveDataToStorage()
      }
    },

    saveDataToStorage() {
      localStorage.setItem('selectedCurrency', this.selectedCurrency)
      localStorage.setItem('selectedCurrencyAmount', this.selectedCurrencyAmount.toString())
      localStorage.setItem('baseCurrencyAmount', this.baseCurrencyAmount.toString())
    }
  }
})
