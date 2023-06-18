import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Valute } from './currencyStore.types'

export const useCurrencyStore = defineStore('currency', () => {
  const responseValute = ref<Valute | null>(null)
  const loadingError = ref(false)
  const selectedCurrency = ref(localStorage.getItem('selectedCurrency') || 'USD')
  const selectedCurrencyAmount = ref<number | string>(
    localStorage.getItem('selectedCurrencyAmount') || '0'
  )
  const baseCurrencyAmount = ref<number | string>(localStorage.getItem('baseCurrencyAmount') || '0')

  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
      responseValute.value = response.data.Valute
    } catch (error) {
      console.log(error)
      loadingError.value = true
    }
  }

  const convertCurrency = () => {
    if (responseValute.value !== null) {
      const selectedCurrencyValue = parseFloat(responseValute.value[selectedCurrency.value].Value)
      const amount = selectedCurrencyAmount.value
      baseCurrencyAmount.value = (+amount * selectedCurrencyValue).toFixed(2)
      saveDataToStorage()
    }
  }

  const convertBaseCurrency = () => {
    if (responseValute.value !== null) {
      const selectedCurrencyValue = parseFloat(responseValute.value[selectedCurrency.value].Value)
      const amount = baseCurrencyAmount.value
      selectedCurrencyAmount.value = (+amount / selectedCurrencyValue).toFixed(2)
      saveDataToStorage()
    }
  }

  const saveDataToStorage = () => {
    localStorage.setItem('selectedCurrency', selectedCurrency.value)
    localStorage.setItem('selectedCurrencyAmount', selectedCurrencyAmount.value.toString())
    localStorage.setItem('baseCurrencyAmount', baseCurrencyAmount.value.toString())
  }

  return {
    responseValute,
    loadingError,
    selectedCurrency,
    selectedCurrencyAmount,
    baseCurrencyAmount,
    fetchData,
    convertCurrency,
    convertBaseCurrency,
    saveDataToStorage
  }
})
