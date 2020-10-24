/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-24 15:53:32
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { observer } from '@utils/decorators'
import Item from '../_/item'
import { levelList, sortList } from '../_/utils'

const event = {
  id: '英灵殿.跳转'
}

function List(props, { $ }) {
  const { _loaded } = $.valhallList
  if (!_loaded) {
    return <Loading style={_.container.flex} />
  }

  const { level, sort, direction } = $.state
  let _list = $.valhallList
  if (level) {
    _list = {
      ..._list,
      list: levelList(level, _list.list)
    }
  }

  if (sort) {
    _list = {
      ..._list,
      list: sortList(sort, direction, _list.list)
    }
  }
  return (
    <ListView
      style={_.container.flex}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={_list}
      renderItem={renderItem}
      onHeaderRefresh={$.fetchValhallList}
    />
  )
}

List.defaultProps = {
  title: '全部'
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)

function renderItem({ item, index }) {
  return <Item index={index} type='valhall' event={event} {...item} />
}
