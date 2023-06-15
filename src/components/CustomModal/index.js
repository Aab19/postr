import React from 'react'
import PropType from 'prop-types'
import {useTranslation} from 'react-i18next'
import {Modal, View} from 'react-native'

import {gstyles} from 'utils'

import TextView from 'components/TextView'
import CustomButton from 'components/CustomButton'

const CustomModal = ({
  visible,
  onRequestClose,
  onCloseModal,
  onConfirmDelete,
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
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View className="relative h-full justify-center items-center p-6">
          <View className="bg-[#F3F0F3] w-full h-1/3 p-6 justify-center">
            <TextView
              content={t('delete-post')}
              customClass="w-full text-center text-[22px]"
              customStyle={gstyles.typefaceBold}
            />
            <TextView
              content={t('delete-undone')}
              customClass="w-full text-center text-[18px] mt-2"
            />
            <View className="flex-row justify-center items-center">
              <CustomButton
                onPress={() => onConfirmDelete()}
                containerClass="mt-8 px-5"
                customClass="uppercase"
                customStyle={gstyles.typefaceBold}
                text={t('yes-delete')}
              />
              <CustomButton
                onPress={() => onCloseModal(!visible)}
                containerClass="mt-8 ml-4 px-7"
                customClass="uppercase"
                customStyle={gstyles.typefaceBold}
                text={t('cancel')}
              />
            </View>
          </View>
        </View>
      </Modal>
      <TextView />
    </View>
  )
}

CustomModal.propTypes = {
  visible: PropType.bool,
  onRequestClose: PropType.func,
  onCloseModal: PropType.func,
  onConfirmDelete: PropType.func,
}

CustomModal.defaultProps = {
  visible: false,
  onRequestClose: () => {},
  onCloseModal: () => {},
  onConfirmDelete: () => {},
}

export default React.memo(CustomModal)
