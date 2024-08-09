/*
 * @Author: czy0729
 * @Date: 2024-03-29 04:26:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 08:53:49
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Touchable } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Time({ time, prevTime, expand, onToggleExpand }) {
  return (
    <View style={stl(styles.time, prevTime && prevTime === time && styles.transparent)}>
      {!!(time && !(time === '2359' && !expand)) && (
        <Text bold>{time === '2359' ? '未知' : `${time.slice(0, 2)}:${time.slice(2)}`}</Text>
      )}
      {time === '2359' && (
        <Touchable style={styles.undetermined} withoutFeedback onPress={onToggleExpand}>
          <Text type='sub'>{expand ? '收起' : '展开'}</Text>
        </Touchable>
      )}
    </View>
  )
}

export default ob(Time)
