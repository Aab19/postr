import AsyncStorage from '@react-native-async-storage/async-storage'

export const setDataLocal = async (key, value) => {
  try {
    let setValue = await AsyncStorage.setItem(key, value)
    return setValue != null ? setValue : null
  } catch (error) {}
}

export const getDataLocal = async (key, string = false) => {
  try {
    let getValue = await AsyncStorage.getItem(key)
    if (getValue !== null && string) {
      return getValue
    } else {
      return JSON.parse(getValue)
    }
  } catch (error) {}
}

export const removeDataLocal = async key => {
  try {
    let removeValue = await AsyncStorage.removeItem(key)
    return removeValue
  } catch (error) {}
}

export const clearAllDataLocal = async () => {
  AsyncStorage.clear()
}
