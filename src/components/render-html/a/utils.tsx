/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:32:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-17 05:35:40
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore, subjectStore, rakuenStore } from '@stores'
import { runAfter } from '@utils'
import { navigationReference } from '@utils/app'
import { HOST, IOS } from '@constants'
import { ReactNode } from '@types'
import { Touchable } from '../../touchable'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { Iconfont } from '../../iconfont'
import { Cover } from '../cover'
import { Avatar } from '../avatar'
import { fetchMediaQueue } from '../utils'
import { memoStyles } from './styles'

/**
 * @todo: 待优化, 安卓Text中一定要过滤非文字节点
 */
export function filterChildren(
  children: ReactNode | ReactNode[]
): ReactNode | ReactNode[] {
  if (IOS) return children

  const childrens = React.Children.toArray(children)
  const data = React.Children.toArray(children).filter(
    item =>
      // @ts-ignore
      item?.type?.displayName === 'Text'
  )
  if (data.length) return data

  return childrens
    .map(
      item =>
        // @ts-ignore
        item?.props?.src
    )
    .filter(item => !!item)
}

/**
 * 获取html根节点文字
 */
function getRawChildrenText(passProps) {
  try {
    const text = passProps?.rawChildren?.[0]?.data
    if (text) return text

    const children = passProps?.rawChildren?.[0]?.children
    if (Array.isArray(children)) {
      let text = ''
      children.forEach(item => {
        if (typeof item.data === 'string') text += item.data
      })
      return text
    }

    return ''
  } catch (error) {
    console.info('getRawChildrenText error', error)
    return ''
  }
}

/**
 * AC自动机猜测条目文字
 */
export function getACSearch({ style, passProps, params, onPress }) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const navigation = navigationReference()
    const { subjectId } = params
    return (
      <Text
        style={style}
        selectable
        underline
        onPress={() => {
          navigation
            ? navigation.push('Subject', {
                subjectId,
                _cn: text
              })
            : onPress(null, `${HOST}/subject/${subjectId}`, {
                _cn: text
              })
        }}
      >
        {text}
      </Text>
    )
  }
}

/**
 * 条目媒体块
 */
export function getSubject({ passProps, params, href, onLinkPress }) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const { subjectId } = params
    const {
      air_date,
      images = {},
      name,
      name_cn,
      rating = {},
      _loaded
    } = subjectStore.subject(subjectId)
    if (!_loaded) {
      setTimeout(() => {
        runAfter(() => fetchMediaQueue('subject', subjectId))
      }, 2000)
    } else {
      const { score } = rating
      const image = images.common
      if (image) {
        const styles = memoStyles()
        const top = name_cn || name || text || ''
        const bottom = text !== top && text !== href ? text : name || name_cn || ''
        const showScore = !systemStore.setting.hideScore && score
        const showBottom = bottom && bottom !== top
        return (
          <Flex style={styles.wrap}>
            <Touchable onPress={onLinkPress}>
              <Flex style={styles.body}>
                <Cover src={image} size={48} radius textOnly={false} />
                <View style={_.ml.sm}>
                  <Text style={styles.top} size={12} bold numberOfLines={2} selectable>
                    {top}{' '}
                    {!!air_date && (
                      <Text size={9} lineHeight={12} type='sub' bold>
                        {String(air_date).slice(0, 7)}
                      </Text>
                    )}
                  </Text>
                  {(showScore || showBottom) && (
                    <Flex style={_.mt.xs}>
                      {showScore && (
                        <Flex style={_.mr.xs}>
                          <Iconfont name='md-star' size={10} color={_.colorWarning} />
                          <Text style={_.ml.xxs} type='sub' size={10} bold>
                            {score}
                          </Text>
                        </Flex>
                      )}
                      {showBottom && (
                        <Text
                          style={styles.bottom}
                          type='sub'
                          size={10}
                          bold
                          numberOfLines={1}
                          selectable
                        >
                          {showScore && '· '}
                          {bottom}
                        </Text>
                      )}
                    </Flex>
                  )}
                </View>
              </Flex>
            </Touchable>
          </Flex>
        )
      }
    }
  }
}

/**
 * 帖子媒体块
 */
export function getTopic({ passProps, params, onLinkPress }) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const { topicId } = params
    const { avatar, group, time, userName, _loaded } =
      // @ts-ignore
      rakuenStore.topic(topicId)
    if (!_loaded) {
      setTimeout(() => {
        runAfter(() => fetchMediaQueue('topic', topicId))
      }, 2000)
    } else {
      const styles = memoStyles()
      const { list } =
        // @ts-ignore
        rakuenStore.comments(topicId)
      if (avatar && group && userName) {
        let reply = 0
        list.forEach(item => {
          reply += 1
          if (item?.sub?.length) reply += item.sub.length
        })
        return (
          <Flex style={styles.wrap}>
            <Touchable onPress={onLinkPress}>
              <Flex style={styles.body}>
                <Avatar src={avatar} size={48} radius textOnly={false} />
                <View style={_.ml.sm}>
                  <Text style={styles.top} size={12} bold numberOfLines={2} selectable>
                    {text}{' '}
                    {!!time && (
                      <Text size={9} lineHeight={12} type='sub' bold>
                        {String(time).split(' ')?.[0]}
                      </Text>
                    )}
                  </Text>
                  <Flex style={_.mt.xs}>
                    <Text
                      style={styles.bottom}
                      type='sub'
                      size={10}
                      bold
                      numberOfLines={1}
                      selectable
                    >
                      {reply}回复 · {group} · {userName}
                    </Text>
                  </Flex>
                </View>
              </Flex>
            </Touchable>
          </Flex>
        )
      }
    }
  }
}

/**
 * 人物媒体块
 */
export function getMono({ passProps, params, onLinkPress }) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const { monoId } = params
    const { cover, name, nameCn, _loaded } =
      // @ts-ignore
      subjectStore.mono(monoId)
    if (!_loaded) {
      setTimeout(() => {
        runAfter(() => fetchMediaQueue('mono', monoId))
      }, 2000)
    } else {
      const styles = memoStyles()
      if (cover) {
        const bottom = nameCn === text ? name : nameCn
        return (
          <Flex style={styles.wrap}>
            <Touchable onPress={onLinkPress}>
              <Flex style={styles.body}>
                <Cover
                  src={cover.replace('/m/', '/g/')}
                  size={48}
                  radius
                  textOnly={false}
                  quality={false}
                />
                <View style={_.ml.sm}>
                  <Text style={styles.top} size={12} bold numberOfLines={2} selectable>
                    {text}
                  </Text>
                  {bottom !== text && (
                    <Flex style={_.mt.xs}>
                      <Text
                        style={styles.bottom}
                        type='sub'
                        size={10}
                        bold
                        numberOfLines={1}
                        selectable
                      >
                        {bottom}
                      </Text>
                    </Flex>
                  )}
                </View>
              </Flex>
            </Touchable>
          </Flex>
        )
      }
    }
  }
}