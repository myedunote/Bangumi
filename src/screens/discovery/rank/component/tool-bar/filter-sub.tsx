/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-19 18:20:40
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { MODEL_RANK_BOOK_FILTER_SUB, MODEL_RANK_GAME_FILTER_SUB } from '@constants'
import { RankFilterSub } from '@types'
import { Ctx } from '../../types'

const DATA = {
  书籍: MODEL_RANK_BOOK_FILTER_SUB,
  游戏: MODEL_RANK_GAME_FILTER_SUB
} as const

const TEXT = {
  书籍: '系列',
  游戏: '平台'
} as const

/** 二级分类 */
function Filter(_props, { $ }: Ctx) {
  if (!DATA[$.typeCn]) return null

  const { filterSub } = $.state
  const data = DATA[$.typeCn]
  const text: string = data.getLabel(filterSub)
  return (
    <ToolBar.Popover
      key={$.typeCn}
      data={data.data.map((item: { label: string }) => item.label)}
      text={text === '全部' ? TEXT[$.typeCn] : text}
      type={filterSub === '' ? undefined : 'desc'}
      onSelect={(title: RankFilterSub) => $.onFilterSubSelect(title, data)}
      heatmap='排行榜.二级分类选择'
    />
  )
}

export default obc(Filter)
