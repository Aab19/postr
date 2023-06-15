import {StyleSheet} from 'react-native'

export const theme = {
  violet: '#714668',
  violet10: '#DAD6D9',
  violet50: '#AA95A6',
  violet60: '#A0869A',
  violet87: '#805B78',
  violetHint: '#80714668',
  redSoft: '#F63E7C',
  redSoft50: '#ED91B0',
  redSoft60: '#F081A6',
  redSoft87: '#F4548A',
  success: '#66bb6a',
  error: '#F00073',
  transparent: '#00FFFFFF',
  shimmer: '#DDDDDD',
  bottomNav: '#F3F0F3',
  white: '#FFF',
  whiteSmoke: '#F3F0F3',
}

export const fonts = {
  light: 'Satoshi-Light',
  regular: 'Satoshi',
  medium: 'Satoshi-Medium',
  bold: 'Satoshi-Bold',
  black: 'Satoshi-Black',
}

export const gstyles = StyleSheet.create({
  typeface: {
    fontFamily: fonts.regular,
  },
  typefaceMedium: {
    fontFamily: fonts.medium,
  },
  typefaceBold: {
    fontFamily: fonts.bold,
  },
  typefaceBlack: {
    fontFamily: fonts.black,
  },
  bgWhiteSmoke: {
    backgroundColor: theme.whiteSmoke,
  },
  violetText: {
    color: theme.violet,
  },
  violetText60: {
    color: theme.violet60,
  },
  redSoftText: {
    color: theme.redSoft,
  },
  hintText: {
    color: theme.violetHint,
  },
})
