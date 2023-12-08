/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:35:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-06 04:04:04
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.windSm,
    minHeight: 100
  },
  dragging: {
    minHeight: _.window.height - _.tabBarHeight
  },
  transparent: {
    opacity: _.select(0.6, 0.4)
  },
  text: {
    marginTop: _.ios(_.sm, _.md),
    marginLeft: _.md,
    marginBottom: _.sm
  },
  dragItem: {
    height: STORYBOOK ? 94 : (_.windowSm.width - 2 * _.windSm) / 4
  }
}))
