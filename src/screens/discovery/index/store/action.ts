/*
 * @Author: czy0729
 * @Date: 2024-07-17 03:43:57
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-17 03:43:57
 */
import { systemStore } from '@stores'
import { appNavigate, info, matchBgmUrl, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { Navigation } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 刷新到顶函数引用 */
  scrollToIndex: any

  /** 底部 TabBar 再次点击滚动到顶并刷新数据 */
  forwardRef = (ref: { scrollToIndex: any }) => {
    this.scrollToIndex = ref?.scrollToIndex
  }

  /** 刷新到顶 */
  onRefreshThenScrollTop = () => {
    try {
      if (typeof this.scrollToIndex === 'function') {
        t('其他.刷新到顶', {
          screen: 'Discovery'
        })

        this.fetchOnline()
        this.scrollToIndex({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
      }
    } catch (error) {
      console.error('Discovery', 'onRefreshThenScrollTop', error)
    }
  }

  /** 切换识别剪贴板的弹窗 */
  toggleLinkModal = () => {
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  /** 识别剪贴板的弹窗中的输入框 */
  onChangeText = (link: string) => {
    this.setState({
      link
    })
  }

  /** 剪贴板提交 */
  onLinkSubmit = (navigation: Navigation) => {
    let { link } = this.state
    if (!link.length) {
      info('请输入链接')
      return
    }

    if (!(link.includes('http://') || link.includes('https://'))) {
      link = `https://${link}`
    }

    const urls = matchBgmUrl(link, true) || []
    const url = urls[0]
    if (!url) {
      info('链接不符合格式')
      return
    }

    appNavigate(url, navigation)
    this.setState({
      visible: false,
      link: ''
    })

    t('发现.剪贴板', {
      link
    })
  }

  /** 切换是否拖拽中 */
  toggleDragging = () => {
    const { dragging } = this.state
    try {
      if (!dragging) {
        this.scrollToIndex({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
      }
    } catch (error) {
      console.error('Discovery', 'toggleDragging', error)
    }

    this.setState({
      dragging: !dragging
    })
  }

  /** 是否显示年鉴 2021 的动画 */
  toggleBlockTrain = () => {
    const { showBlockTrain } = this.state
    this.setState({
      showBlockTrain: !showBlockTrain
    })
    this.save()
  }

  /** 更新菜单的自定义配置 */
  saveDiscoveryMenu = (discoveryMenu: typeof systemStore.setting.discoveryMenu) => {
    systemStore.setSetting('discoveryMenu', discoveryMenu)

    t('发现.更新菜单', {
      length: discoveryMenu.length
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
