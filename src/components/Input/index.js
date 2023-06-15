import React, {useState} from 'react'
import PropType from 'prop-types'
import {Platform, TextInput, View} from 'react-native'

import {gstyles, theme} from 'utils/styles'

import TextView from 'components/TextView'

const Input = ({
  text,
  changeText,
  placeholder,
  containerClass,
  customClass,
  customStyle,
  type,
  error,
  password,
  currency,
  maxLength,
  keyboardType,
  onFocus,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(password)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View className={`relative ${containerClass}`}>
      {currency && (
        <TextView
          content="Rp"
          customClass="absolute top-[17px] left-[16px] z-[1] text-[16px]"
          customStyle={gstyles.typefaceBold}
        />
      )}
      <TextInput
        autoCorrect={false}
        onFocus={() => {
          onFocus()
          setIsFocused(true)
        }}
        onBlur={() => {
          setIsFocused(false)
        }}
        className={`font-['Satoshi-Medium'] text-[#714668] bg-white px-4 ${
          Platform.OS === 'ios' ? 'py-5' : 'py-4'
        } pr-12 rounded-[8px] ${customClass}`}
        customStyle={customStyle}
        onChangeText={changeText}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={theme.violetHint}
        maxLength={maxLength}
        secureTextEntry={showPassword}
        {...props}
      />
      {error && (
        <TextView
          content={error}
          customClass="absolute bottom-[-18px] left-3 text-[12px]"
          customStyle={gstyles.redSoftText}
        />
      )}
    </View>
  )
}

Input.propTypes = {
  text: PropType.string,
  changeText: PropType.func,
  placeholder: PropType.string.isRequired,
  containerClass: PropType.string,
  customClass: PropType.string,
  type: PropType.string,
  error: PropType.string,
  password: PropType.bool,
  currency: PropType.bool,
  maxLength: PropType.number,
  onFocus: PropType.func,
}

Input.defaultProps = {
  containerClass: '',
  customClass: '',
  type: 'text',
  maxLength: 255,
  changeText: () => {},
  onFocus: () => {},
}

export default React.memo(Input)
