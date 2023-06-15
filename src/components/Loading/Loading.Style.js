import {StyleSheet} from 'react-native'

import {theme} from 'utils/styles'

export const LoadingStyle = StyleSheet.create({
  loader: {
    height: 70,
    backgroundColor: theme.white,
    marginHorizontal: 50,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
})
