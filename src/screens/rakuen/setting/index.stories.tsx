/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:23:49
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { RakuenSetting as Component } from '@screens'

export default {
  title: 'screens/RakuenSetting',
  component: Component
}

export const RakuenSetting = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('RakuenSetting')} />
    </StorybookList>
  </StorybookSPA>
)
