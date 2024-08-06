/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:25:49
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Catalogs as Component } from '@screens'

export default {
  title: 'screens/Catalogs',
  component: Component
}

export const Catalogs = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Catalogs')} />
    </StorybookList>
  </StorybookSPA>
)
