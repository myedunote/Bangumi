/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-03 13:25:13
 */
import React from 'react'
import { Component, Page } from '@components'
import { TapListener } from '@_'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Bottom from './component/bottom'
import Heatmaps from './component/heatmaps'
import List from './component/list'
import TouchScroll from './component/touch-scroll'
import Header from './header'
import { useTopicPage } from './hooks'
import Store from './store'
import { Ctx } from './types'
import './styles'

/** 帖子 */
const Topic = (_props, context: Ctx) => {
  const {
    forwardRef,
    fixedTextareaRef,
    onFloorPress,
    onShowFixedTextarea,
    onScrollToIndexFailed,
    onDirect
  } = useTopicPage(context)

  return useObserver(() => (
    <Component id='screen-topic'>
      <TapListener>
        <Page statusBarEvent={false}>
          <List
            forwardRef={forwardRef}
            onScrollToIndexFailed={onScrollToIndexFailed}
            onShowFixedTextarea={onShowFixedTextarea}
          />
          <TouchScroll onPress={onFloorPress} />
        </Page>
      </TapListener>
      <Header />
      <Bottom fixedTextareaRef={fixedTextareaRef} onDirect={onDirect} />
      <Heatmaps />
    </Component>
  ))
}

export default ic(Store, Topic)
