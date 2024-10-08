/*
 * @Author: czy0729
 * @Date: 2022-07-22 14:46:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 11:55:51
 */
import { _ } from '@stores'
import { MODEL_SUBJECT_TYPE, WEB } from '@constants'
import {
  Loaded,
  RankAnimeFilter,
  RankBookFilter,
  RankGameFilter,
  RankRealFilter,
  SubjectType
} from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const DEFAULT_TYPE = MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画')

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 是否显示列表, 制造切页效果 */
  show: true,

  /** 云快照 */
  ota: {}
}

export const STATE = {
  /** 当前页数 */
  page: 0,

  /** 各类型当前页数 */
  currentPage: {
    all: 1,
    anime: 1,
    book: 1,
    game: 1,
    music: 1,
    real: 1
  },

  /** 各类型当前 Input 页数 */
  ipt: {
    all: '1',
    anime: '1',
    book: '1',
    game: '1',
    music: '1',
    real: '1'
  },

  /** 类型筛选 */
  type: DEFAULT_TYPE,

  /** 二级筛选 */
  filter: '' as RankAnimeFilter | RankBookFilter | RankGameFilter | RankRealFilter,

  /** 年筛选 */
  airtime: '',

  /** 月筛选 */
  month: '',

  /** 是否列表布局 (工具条) */
  list: true,

  /** 是否锁定工具条 (工具条) */
  fixed: WEB,

  /** 是否锁定分液器 (工具条) */
  fixedPagination: WEB,

  /** 是否显示收藏条目 (工具条) */
  collected: true,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
