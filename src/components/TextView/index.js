import React from 'react'
import PropType from 'prop-types'
import {Text} from 'react-native'

const TextView = ({
  customClass,
  customStyle,
  lines,
  ellipsis,
  content,
  disabled,
  onPress,
}) => {
  return (
    <Text
      disabled={disabled}
      className={`font-['Satoshi'] text-[#714668]  ${customClass}`}
      style={customStyle}
      numberOfLines={lines}
      ellipsizeMode={ellipsis}
      onPress={onPress}>
      {content}
    </Text>
  )
}

TextView.propTypes = {
  customClass: PropType.string,
  lines: PropType.number,
  ellipsis: PropType.string,
  content: PropType.any,
  disabled: PropType.bool,
  onPress: PropType.func,
}

TextView.defaultProps = {
  customClass: '',
  disabled: false,
}

export default React.memo(TextView)
