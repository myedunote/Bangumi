/*
 * @Author: czy0729
 * @Date: 2021-01-20 12:15:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-01 18:31:16
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { _, rakuenStore, uiStore, userStore } from '@stores'
import {
  confirm,
  copy,
  feedback,
  getCommentPlainText,
  info,
  isChineseParagraph,
  removeHTMLTag,
  removeURLs,
  stl
} from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_BLOG, HTML_TOPIC } from '@constants'
import { AnyObject, TopicId } from '@types'
import { Popover } from '../../../base'
import {
  ACTION_COPY,
  ACTION_COPY_URL,
  ACTION_DELETE,
  ACTION_EDIT,
  ACTION_IGNORE,
  ACTION_LIKES,
  ACTION_REPLY,
  ACTION_TRACK,
  ACTION_TRANSLATE,
  ACTION_UNTRACK
} from './ds'
import { styles } from './styles'

function IconExtra(
  {
    style,
    topicId,
    id,
    formhash,
    likeType,
    replySub,
    erase,
    userId,
    userName,
    message = '',
    msg,
    onJumpTo,
    onShowFixedTextare
  }: AnyObject<{
    topicId: TopicId
  }>,
  { $ }
) {
  const data = [
    // 编辑
    erase && $?.doDeleteReply && ACTION_EDIT,

    // 贴贴
    rakuenStore.setting.likes && likeType && ACTION_LIKES,

    // 回复
    replySub && !userStore.isLimit && $?.showFixedTextarea && ACTION_REPLY,

    // 复制
    ACTION_COPY,
    ACTION_COPY_URL,

    // 关注
    rakuenStore.commentTracked(userId) ? ACTION_UNTRACK : ACTION_TRACK,

    // 翻译
    $?.doTranslateFloor &&
      !isChineseParagraph(removeURLs(removeHTMLTag(msg)), 0.5) &&
      ACTION_TRANSLATE,

    // 屏蔽
    !erase && userStore.isWebLogin && ACTION_IGNORE,

    // 删除
    erase && $?.doDeleteReply && ACTION_DELETE
  ] as const

  return (
    <Popover
      style={stl(styles.touch, style)}
      data={data.filter(item => !!item)}
      onSelect={title => {
        switch (title) {
          case ACTION_LIKES:
            uiStore.showLikesGrid(topicId, id, formhash, likeType, {
              recommandPosition: 'top'
            })
            break

          case ACTION_REPLY:
            $?.showFixedTextarea?.(userName, replySub, message, msg)
            if (typeof onShowFixedTextare === 'function') onShowFixedTextare()
            break

          case ACTION_EDIT:
            $?.showFixedTextareaEdit?.(id, onShowFixedTextare, onJumpTo)
            break

          case ACTION_COPY:
            copy(getCommentPlainText(msg), `已复制 ${userName} 的回复`)

            t('帖子.复制回复')
            break

          case ACTION_COPY_URL:
            if (typeof topicId === 'string') {
              if (topicId.includes('blog')) {
                copy(HTML_BLOG(topicId.split('/')?.[1], id), '已复制')
              } else {
                copy(HTML_TOPIC(topicId, id), '已复制')
              }

              t('帖子.复制楼层链接')
            }
            break

          case ACTION_TRACK:
            rakuenStore.trackUsersComment(userId)

            t('帖子.特别关注', {
              userId
            })
            break

          case ACTION_UNTRACK:
            rakuenStore.cancelTrackUsersComment(userId)

            t('帖子.取消特别关注', {
              userId
            })
            break

          case ACTION_TRANSLATE:
            $?.doTranslateFloor?.(id, msg)
            break

          case ACTION_IGNORE:
            confirm(
              `与 ${userName} 绝交（不再看到用户的所有话题、评论、日志、私信、提醒）?`,
              async () => {
                if (!rakuenStore.formhash) await rakuenStore.fetchPrivacy()

                rakuenStore.doBlockUser(
                  {
                    keyword: String(userId)
                  },
                  async () => {
                    info('已添加绝交')
                    feedback()
                    rakuenStore.fetchPrivacy()

                    t('帖子.绝交')
                  },
                  () => {
                    info('添加失败, 可能授权信息过期')
                  }
                )
              }
            )
            break

          case ACTION_DELETE:
            confirm('确定删除回复?', () => $?.doDeleteReply?.(erase))
            break

          default:
            break
        }
      }}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont style={_.ml.md} name='md-more-vert' size={18} />
      </Flex>
    </Popover>
  )
}

export default obc(IconExtra)
