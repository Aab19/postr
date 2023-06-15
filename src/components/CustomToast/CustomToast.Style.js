import {StyleSheet} from 'react-native'

import {theme} from 'utils/styles'

export const CustomToastStyle = StyleSheet.create({
  cardContainerIOS: {
    shadowColor: theme.violet,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  cardContainer: {
    elevation: 8,
    shadowColor: theme.violet,
  },
})
