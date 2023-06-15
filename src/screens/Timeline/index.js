import React, {useEffect, useState} from 'react'
import {
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import Geolocation from '@react-native-community/geolocation'
import {useDispatch, useSelector} from 'react-redux'
import {FlashList} from '@shopify/flash-list'

import {USERNAME, getDataLocal, setDataLocal} from 'utils'
import {theme} from 'utils/styles'
import TimelineAction from 'store/timeline/action'

import {
  CustomBottomMenu,
  CustomButton,
  CustomModal,
  CustomToast,
  TextView,
  CardList,
} from 'components'
import {toast} from 'components/CustomToast'

import {IconSetting} from 'assets/img'

const Timeline = ({navigation: {navigate, setParams}, route}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const store = useSelector(({timeline}) => timeline)
  const [user, setUser] = useState(null)
  const [listPost, setListPost] = useState([])
  const [refreshPost, setRefreshPost] = React.useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [selectedMenuData, setSelectedMenuData] = useState()
  const [showMenuModal, setShowMenuModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        Geolocation.getCurrentPosition(
          position => {
            setUser(prevState => ({
              ...prevState,
              ['latitude']: JSON.stringify(position.coords.latitude),
              ['longitude']: JSON.stringify(position.coords.longitude),
            }))
          },
          error => {
            Alert.alert('position not found', JSON.stringify(error))
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000,
          },
        )
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Allow apps to access your current location?',
            message: 'Allow apps to get your current latitude and longitude.',
            buttonNeutral: 'Ask Me Later',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              setUser(prevState => ({
                ...prevState,
                latitude: JSON.stringify(position.coords.latitude),
                longitude: JSON.stringify(position.coords.longitude),
              }))
            },
            error => Alert.alert('position not found', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 86400},
          )
        } else {
          console.log('ACCESS NOT GRANTED')
        }
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const generateRandomUsername = async () => {
    let storage = await getDataLocal(USERNAME)
    if (storage === null) {
      let username = Math.random().toString(36).substring(2, 7)
      setUser(prevState => ({
        ...prevState,
        ['username']: username,
      }))

      await setDataLocal(USERNAME, JSON.stringify(user))
    } else {
      let data = await getDataLocal(USERNAME)
      setUser(prevState => ({
        ...prevState,
        ['username']: data.username,
      }))
    }
  }

  const onRefreshPost = () => {
    setRefreshPost(true)
    setPageLoading(true)
    dispatch(TimelineAction.fetchData())
  }

  const menuAction = value => {
    if (value.author === user.username) {
      setSelectedMenuData(value)
      setShowMenuModal(true)
    } else {
      toast.show({
        type: 'postrToast',
        props: {
          title: t('delete-post'),
          desc: t('delete-block'),
          error: true,
        },
        position: 'bottom',
      })
    }
  }

  const replyPost = value => {
    navigate({
      name: 'Post',
      params: {
        replyPost: true,
        replyPostData: value,
      },
    })
  }

  const renderListPosts = ({item, index}) => {
    return (
      <CardList
        key={index}
        data={item}
        first={index === 0 ? true : false}
        menu={menuAction}
        reply={() => replyPost(item)}
        detail={() =>
          navigate({
            name: 'Detail',
            params: {
              detail: item,
            },
            merge: true,
          })
        }
      />
    )
  }

  const closeMenuModal = value => {
    setShowMenuModal(value)
  }

  const closeDeleteModal = value => {
    setShowDeleteModal(value)
  }

  const deletePost = () => {
    setShowMenuModal(false)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    setShowDeleteModal(false)
    setPageLoading(true)
    const status = await dispatch(
      TimelineAction.deleteData(selectedMenuData.id),
    )

    if (status === 200) {
      setPageLoading(false)
      toast.show({
        type: 'postrToast',
        props: {
          title: t('delete'),
          desc: t('delete-success'),
        },
        position: 'bottom',
      })
    }
  }

  useEffect(() => {
    dispatch(TimelineAction.fetchData())
    requestLocationPermission()
    generateRandomUsername()
  }, [])

  useEffect(() => {
    setPageLoading(false)
    setRefreshPost(false)
    setListPost(store.data)
  }, [store, store.data, store.data.length])

  useEffect(() => {
    if (route.params?.successPosting) {
      toast.show({
        type: 'postrToast',
        props: {
          title: t('success'),
          desc: t('post-success'),
        },
        position: 'bottom',
      })
      setParams({
        successPosting: false,
      })
      setListPost([])
      setTimeout(() => {
        setListPost(store.data)
      }, 1)
    }
    if (route.params?.successReply) {
      toast.show({
        type: 'postrToast',
        props: {
          title: t('success'),
          desc: t('reply-success'),
        },
        position: 'bottom',
      })
      setParams({
        successReply: false,
      })
      setListPost([])
      setTimeout(() => {
        setListPost(store.data)
      }, 1)
    }
  }, [route.params])

  return (
    <SafeAreaView className="flex-1">
      <CustomToast />
      <CustomBottomMenu
        visible={showMenuModal}
        onCloseModal={closeMenuModal}
        onDeletePost={deletePost}
      />
      <CustomModal
        visible={showDeleteModal}
        onCloseModal={closeDeleteModal}
        onConfirmDelete={confirmDelete}
      />
      <View className="px-4">
        <View className="flex flex-row justify-between items-center mt-2">
          <TextView customClass="font-bold text-[24px]" content="Postr" />
          <TouchableOpacity onPress={() => navigate('Settings')}>
            <IconSetting width={24} height={24} />
          </TouchableOpacity>
        </View>
        <CustomButton
          text="+"
          containerClass="flex flex-col justify-center items-center absolute bottom-[60px] right-2 bg-[#F63E7C] w-[60px] h-[60px] rounded-full !p-0 z-[500]"
          customClass="text-white text-[28px] font-semibold"
          onPress={() => navigate('Post')}
        />

        {pageLoading ? (
          <View className="flex flex-col justify-center items-center h-full">
            <ActivityIndicator size="large" color={theme.violet} />
          </View>
        ) : listPost.length === 0 ? (
          <View className="flex flex-col justify-center items-center h-full">
            <TextView content="There is no content" customClass="text-[20px]" />
          </View>
        ) : (
          <View className="mt-3 w-full h-full">
            <FlashList
              key={'_'}
              data={listPost}
              extraData={listPost}
              estimatedItemSize={1000}
              contentContainerStyle={{
                paddingBottom: 120,
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderListPosts}
              refreshControl={
                <RefreshControl
                  refreshing={refreshPost}
                  onRefresh={onRefreshPost}
                  colors={[theme.violet]}
                  tintColor={theme.violet}
                />
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Timeline
