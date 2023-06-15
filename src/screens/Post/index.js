import React, {useEffect, useState} from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'

import {USERNAME, getDataLocal} from 'utils'
import {gstyles} from 'utils/styles'
import TimelineAction from 'store/timeline/action'

import {CustomButton, Input, Loading, TextView} from 'components'

import {IconClose} from 'assets/img'

const Post = ({navigation: {navigate, setParams, goBack}, route}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    post: '',
  })
  const [errors, setErrors] = useState({})
  const [pageLoading, setPageLoading] = useState(false)
  const [replyPost, setReplyPost] = useState(null)

  const handleOnChange = (text, input) => {
    setForm(prevState => ({...prevState, [input]: text}))

    if (input === 'post' && text.length < 1) {
      handleError(t('post-empty'), 'post')
    } else {
      handleError(null, 'post')
    }
  }

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}))
  }

  const handleSubmit = async () => {
    Keyboard.dismiss()
    setPageLoading(true)
    let data = await getDataLocal(USERNAME)

    if (replyPost) {
      let updatedPost = {...replyPost}
      updatedPost.replies.unshift({
        ...updatedPost,
        content: form.post.trim(),
      })

      updatedPost.replies.map(val => {
        val.replies = []
      })
      const status = await dispatch(TimelineAction.updateData(updatedPost))

      if (status === 200) {
        setPageLoading(false)
        navigate({
          name: t('timeline'),
          params: {
            successReply: true,
          },
          merge: true,
        })
      }
    } else {
      let payload = {
        author: data.username,
        content: form.post.trim(),
        replies: [],
        latitude: data.latitude,
        longitude: data.longitude,
      }
      const status = await dispatch(TimelineAction.postData(payload))

      if (status === 201) {
        setPageLoading(false)
        navigate({
          name: t('timeline'),
          params: {
            successPosting: true,
          },
          merge: true,
        })
      }
    }
  }

  useEffect(() => {
    if (route.params?.replyPost) {
      setReplyPost(route.params.replyPostData)
    }
  }, [route.params])

  return (
    <SafeAreaView className="flex-1">
      <Loading visible={pageLoading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="px-4">
        <View className="flex flex-row justify-between items-center py-2">
          <TouchableOpacity
            onPress={() => {
              setParams({
                editPost: false,
                editDataPost: null,
              })
              goBack()
            }}>
            <IconClose />
          </TouchableOpacity>
          <CustomButton
            disabled={form.post.length < 1 ? true : false}
            text={replyPost ? t('reply') : t('post-button')}
            containerClass="px-8 py-2"
            customClass="uppercase"
            customStyle={gstyles.typefaceBold}
            onPress={handleSubmit}
          />
        </View>

        {replyPost && (
          <View>
            <TextView
              customClass="text-[16px] font-bold"
              content={`Username @${replyPost.author}`}
            />
            <TextView
              customClass="my-1"
              content={replyPost.content}
              customStyle={gstyles.typefaceMedium}
            />
            <TextView
              content={`${t('reply-to')} @${replyPost.author}`}
              customStyle={gstyles.typefaceMedium}
            />
          </View>
        )}

        <View>
          <Input
            containerClass="w-full mt-6"
            placeholder={replyPost ? t('reply-placeholder') : t('post')}
            onChangeText={text => handleOnChange(text, 'post')}
            error={errors.post}
            onFocus={() => {
              handleError(null, 'post')
            }}
            multiline={true}
            numberOfLines={5}
            minHeight={Platform.OS === 'ios' && 5 ? 20 * 5 : null}
            maxLength={100}
            textAlignVertical={'top'}
          />
          <View className="flex flex-row justify-end items-end mt-2">
            <TextView content={`${form.post.length}/100`} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Post
