/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-28 21:18:06
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap } from '@components'
import { IconWordCloud } from '@_'
import { copy, getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, URL_SPA } from '@constants'
import HeaderTitle from '../component/header-title'
import IconFavor from '../component/icon/favor'
import { Ctx } from '../types'
import { COMPONENT, DATA, TEXT_COPY, TEXT_REPORT, TEXT_SHARE, TEXT_SPA } from './ds'

function Header(_props, { $, navigation }: Ctx) {
  const url = $.params?._url || `${HOST}/rakuen/topic/${$.topicId}`
  return (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Topic'
      fixed={$.state.fixed}
      title={$.topic.title}
      alias='帖子'
      hm={[url, 'Topic']}
      headerTitle={<HeaderTitle $={$} navigation={navigation} />}
      headerRight={() => (
        <Flex>
          <IconWordCloud
            onPress={() => {
              navigation.push('WordCloud', {
                topicId: $.topicId
              })
            }}
          />
          <IconFavor $={$} />
          <HeaderComp.Popover
            data={[`帖子 · ${$.topicId}`, ...DATA]}
            onSelect={key => {
              t('帖子.右上角菜单', {
                key: key.includes('帖子') ? '浏览器查看' : key
              })

              switch (key) {
                case TEXT_SPA:
                  open(
                    `${URL_SPA}/${getSPAParams('Topic', {
                      topicId: $.topicId
                    })}`
                  )
                  break

                case TEXT_COPY:
                  copy(url, '已复制链接')
                  break

                case TEXT_SHARE:
                  copy(`【链接】${$.title} | Bangumi番组计划\n${url}`, '已复制分享文案')
                  break

                case TEXT_REPORT:
                  open(`${HOST}/group/forum`)
                  break

                default:
                  open(url)
                  break
              }
            }}
          >
            <Heatmap id='帖子.右上角菜单' />
          </HeaderComp.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
