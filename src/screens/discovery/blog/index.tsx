/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:02:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 22:36:27
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import Heatmaps from './heatmaps'
import Store from './store'
import Tabs from './tabs'
import { Ctx } from './types'

/** 全站日志 */
const DiscoveryBlog = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-discovery-blog'>
      <Header />
      <Page loaded={$.state._loaded}>
        <Tabs />
        <Heatmaps />
      </Page>
    </Component>
  ))
}

export default ic(Store, DiscoveryBlog)
