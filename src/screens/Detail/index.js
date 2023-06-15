import React, {useEffect, useState} from 'react'
import {Platform, SafeAreaView, TouchableOpacity, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {FlashList} from '@shopify/flash-list'

import {gstyles} from 'utils'

import {TextView} from 'components'
import CardList from 'components/CardList'

import {IconArrowBack} from 'assets/img'

const Detail = ({navigation: {navigate, goBack}, route}) => {
  const {t} = useTranslation()
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    if (route.params?.detail) {
      setDetail(route.params.detail)
    }
  }, [route.params])

  const renderListReply = ({item, index}) => {
    return (
      <CardList key={index} data={item} first={index === 0 ? true : false} />
    )
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4">
        <View className="flex flex-row items-center">
          <TouchableOpacity onPress={() => goBack()}>
            <IconArrowBack />
          </TouchableOpacity>
          <TextView
            customClass="text-[20px] ml-4 font-bold"
            content={t('detail')}
          />
        </View>

        <View className="mt-4">
          <TextView
            customClass="text-[16px] font-bold"
            content={`Username @${detail?.author}`}
          />
          <TextView
            customClass="my-1"
            content={detail?.content}
            customStyle={gstyles.typefaceMedium}
          />
          <TextView
            customClass="mt-1"
            content={`Lat: ${detail?.latitude}`}
            customStyle={gstyles.typefaceMedium}
          />
          <TextView
            customClass="mt-1"
            content={`Long: ${detail?.longitude}`}
            customStyle={gstyles.typefaceMedium}
          />
        </View>

        <View className="mt-4">
          <TextView
            content="List reply"
            customClass="text-[18px]"
            customStyle={gstyles.typefaceMedium}
          />
          <View className="mt-3 w-full h-full">
            {detail?.replies.length === 0 ? (
              <View className="flex flex-col justify-center items-center h-full relative top-[-100px]">
                <TextView
                  content="There is no reply"
                  customClass="text-[20px]"
                />
              </View>
            ) : (
              <FlashList
                key={'_'}
                data={detail?.replies}
                estimatedItemSize={1000}
                contentContainerStyle={{
                  paddingBottom: Platform.OS === 'ios' ? 300 : 340,
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderListReply}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Detail
