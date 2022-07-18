/*
 * @Author: czy0729
 * @Date: 2022-07-18 10:48:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 21:44:33
 */
import { SETTING_HOME_GRID_COVER_LAYOUT } from '@constants'

export const HOME_SORTING_INFORMATION = {
  APP: '放送中未看 > 放送中 > 明天 > 本季未完结 > 网页',
  放送: '放送中 > 明天放送 > 网页',
  网页: '与网页bgm.tv一致'
} as const

export const VALUES = ['全部', '基本', '隐藏'] as const

export const TEXTS = {
  homeLayout: {
    setting: {
      title: '布局'
    },
    list: {
      title: '列表'
    },
    grid: {
      title: '网格'
    }
  },
  homeListLimit: {
    hd: '列表显示最大收藏数'
  },
  homeGridCoverLayout: {
    hd: '封面形状',
    information: '开启网格布局时条目封面形状',
    search: SETTING_HOME_GRID_COVER_LAYOUT.map(item => item.label).join()
  },
  homeSorting: {
    title: '排序',
    search: HOME_SORTING_INFORMATION
  },
  homeOrigin: {
    hd: '收藏项右侧菜单',
    information: '收藏项右侧按钮组显示菜单按钮\n全部 = 基本操作菜单 + 源头数据菜单',
    search: VALUES
  },
  homeSortSink: {
    hd: '条目自动下沉',
    information: '当条目没有未观看的已放送章节时，自动下沉到底'
  },
  showGame: {
    hd: '游戏标签页',
    information: '首页收藏显示在玩的游戏'
  },
  homeFilter: {
    hd: '列表搜索框'
  }
} as const
