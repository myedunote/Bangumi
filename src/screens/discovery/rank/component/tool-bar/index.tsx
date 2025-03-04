/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-22 07:25:03
 */
import React from 'react'
import { View } from 'react-native'
import { ToolBar as ToolBarComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Area from './area'
import Classification from './classification'
import Expand from './expand'
import Filter from './filter'
import FilterSub from './filter-sub'
import Month from './month'
import More from './more'
import Sort from './sort'
import Source from './source'
import Tag from './tag'
import Target from './target'
import Theme from './theme'
import Type from './type'
import Year from './year'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ToolBar(_props, { $ }: Ctx) {
  const showExpand = $.typeCn !== '音乐'
  return (
    <View style={styles.scale}>
      <ToolBarComp>
        <Type />
        <Sort />
        <Year />
        <Month />
        {showExpand && <Expand />}
        <More />
      </ToolBarComp>
      {showExpand && $.state.expand && (
        <ToolBarComp>
          <Filter />
          <FilterSub />
          <Source />
          <Tag />
          <Theme />
          <Area />
          <Target />
          <Classification />
        </ToolBarComp>
      )}
    </View>
  )
}

export default obc(ToolBar, COMPONENT)
