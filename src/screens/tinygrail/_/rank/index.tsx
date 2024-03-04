/*
 * @Author: czy0729
 * @Date: 2021-03-06 04:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 04:49:42
 */
import React from 'react'
import { Text } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props } from './types'

function Rank({ style, size = 9, value }: Props) {
  if (!value) return null

  const styles = memoStyles()
  return (
    <Text
      style={stl(
        styles.rank,
        {
          backgroundColor: Number(value) <= 500 ? '#ffc107' : '#aaa'
        },
        style
      )}
      size={size}
      lineHeight={1}
      bold
      align='center'
      shadow
    >
      {value}
    </Text>
  )
}

export default ob(Rank)
