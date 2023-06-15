import React from 'react'
import PropType from 'prop-types'
import {useTranslation} from 'react-i18next'
import {Platform, TouchableOpacity, View} from 'react-native'

import {CardListStyle} from './CardList.Style'
import {gstyles} from 'utils/styles'

import TextView from 'components/TextView'

import {IconDotsHorizontal, IconReply} from 'assets/img'

const CardList = props => {
  const {t} = useTranslation()
  const {author, content, replies, latitude, longitude} = props.data

  return (
    <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
      <View
        style={[
          Platform.OS === 'ios'
            ? CardListStyle.cardContainerIOS
            : CardListStyle.cardContainer,
        ]}
        className={`bg-white w-full rounded-[4px] ${
          props.first ? '' : 'mt-3'
        } flex-col justify-between`}>
        <View className="flex flex-row justify-between items-center w-full px-4 py-2">
          <TextView
            content={`@${author}`}
            customClass="text-[16px] font-bold"
          />
          <TouchableOpacity onPress={() => props.menu(props.data)}>
            <IconDotsHorizontal />
          </TouchableOpacity>
        </View>
        <View className="mt-2" style={CardListStyle.line} />
        <View className="px-4 py-2">
          <TextView
            content={content}
            customClass="my-3"
            customStyle={gstyles.typefaceMedium}
          />
        </View>
        <View className="mt-2" style={CardListStyle.line} />
        <View className="flex flex-row justify-between items-center px-4 py-3">
          <TouchableOpacity
            className="flex flex-row items-center relative top-[3px]"
            onPress={props.reply}>
            <IconReply width={20} height={20} />
            <TextView
              content={t('reply')}
              customClass="ml-2 relative top-[-3px]"
              customStyle={gstyles.typefaceMedium}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center"
            onPress={props.detail}>
            <TextView content={`${replies.length} ${t('comment')}`} />
          </TouchableOpacity>
          <View className="flex flex-col max-w-[30%] truncate">
            <TextView content={`Lat: ${latitude}`} />
            <TextView content={`Long: ${longitude}`} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

CardList.propTypes = {
  data: PropType.object.isRequired,
  first: PropType.bool,
  menu: PropType.func,
  reply: PropType.func,
  detail: PropType.func,
  onPress: PropType.func,
}

CardList.defaultProps = {
  menu: () => {},
  reply: () => {},
  detail: () => {},
  onPress: () => {},
}

export default React.memo(CardList)
