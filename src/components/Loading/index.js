import React from 'react'
import PropType from 'prop-types'
import {ActivityIndicator, View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {gstyles, theme} from 'utils/styles'
import {LoadingStyle} from './Loading.Style'

import TextView from 'components/TextView'

const Loading = ({visible}) => {
  const {t} = useTranslation()
  return (
    visible && (
      <View
        className="z-[1000] absolute top-0 bottom-0 left-0 right-0 justify-center items-center"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View style={LoadingStyle.loader}>
          <ActivityIndicator size="large" color={theme.violet} />
          <TextView
            content={t('please-wait')}
            customClass="ml-3 text-[16px]"
            customStyle={gstyles.typefaceMedium}
          />
        </View>
      </View>
    )
  )
}

Loading.propTypes = {
  visible: PropType.bool,
}

Loading.defaultProps = {
  visible: false,
}

export default React.memo(Loading)
