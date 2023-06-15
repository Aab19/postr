import React from 'react'
import PropType from 'prop-types'
import {TouchableOpacity} from 'react-native'

import TextView from 'components/TextView'

const CustomButton = ({
  text,
  containerClass,
  customClass,
  customStyle,
  outline,
  disabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled ? true : false}
      className={` ${
        outline ? 'border-[1px] border-[#F63E7C]' : 'bg-[#F63E7C]'
      }  rounded-[4px] justify-center items-center py-4 ${
        disabled && 'bg-[#DAD6D9]'
      }  ${containerClass}`}>
      <TextView
        customClass={`${
          outline ? 'text-[#F63E7C]' : 'text-white'
        }  text-[16px] ${customClass}`}
        customStyle={customStyle}
        content={text}
      />
    </TouchableOpacity>
  )
}

CustomButton.propTypes = {
  text: PropType.string.isRequired,
  containerClass: PropType.string,
  customClass: PropType.string,
  outline: PropType.bool,
  disabled: PropType.bool,
  share: PropType.bool,
  call: PropType.bool,
  onPress: PropType.func,
}

CustomButton.defaultProps = {
  containerClass: '',
  customClass: '',
  outline: false,
  disabled: false,
  share: false,
  call: false,
  onPress: () => {},
}

export default React.memo(CustomButton)
