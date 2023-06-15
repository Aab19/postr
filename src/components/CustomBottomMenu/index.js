import React from 'react'
import PropType from 'prop-types'
import {useTranslation} from 'react-i18next'
import {Modal, TouchableOpacity, View} from 'react-native'

import {gstyles} from 'utils/styles'

import TextView from 'components/TextView'

import {IconClose} from 'assets/img/icons'

const CustomBottomMenu = ({
  visible,
  onRequestClose,
  onCloseModal,
  onDeletePost,
}) => {
  const {t} = useTranslation()

  return (
    <View
      className={`${
        visible ? 'z-10' : 'z-[-1]'
      } absolute top-0 bottom-0 left-0 right-0 `}
      style={{
        backgroundColor: visible ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View className="bg-[#F3F0F3] absolute bottom-0 left-0 right-0 h-1/3 p-6">
          <View className="flex-row items-center relative">
            <TouchableOpacity
              className="z-[11]"
              onPress={() => onCloseModal(!visible)}>
              <IconClose />
            </TouchableOpacity>
            <TextView
              content={t('menu')}
              customClass="absolute left-0 right-0 text-center text-[22px]"
              customStyle={gstyles.typefaceMedium}
            />
          </View>
          <TouchableOpacity className="p-2  mt-6" onPress={onDeletePost}>
            <TextView
              content={t('delete')}
              customClass="text-[16px]"
              customStyle={gstyles.typefaceMedium}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

CustomBottomMenu.propTypes = {
  visible: PropType.bool,
  onRequestClose: PropType.func,
  onCloseModal: PropType.func,
  onDeletePost: PropType.func,
}

CustomBottomMenu.defaultProps = {
  visible: false,
  onRequestClose: () => {},
  onCloseModal: () => {},
  onDeletePost: () => {},
}

export default React.memo(CustomBottomMenu)
