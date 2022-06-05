/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 15:38:36
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_AIRTIME } from '@constants'

function Year(props, { $ }) {
  const { airtime } = $.state
  return (
    <ToolBar.Popover
      data={DATA_AIRTIME}
      text={airtime || '年'}
      type={airtime ? 'desc' : 'sub'}
      heatmap='用户标签.年选择'
      onSelect={$.onAirdateSelect}
    />
  )
}

export default obc(Year)
