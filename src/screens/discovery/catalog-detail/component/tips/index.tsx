/*
 * @Author: czy0729
 * @Date: 2022-04-17 17:09:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-12 05:54:48
 */
import React from 'react'
import { Progress } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Tips(_props, { $ }: Ctx) {
  const { fetching, message, current, total } = $.state.progress
  return <Progress show={fetching} message={message} current={current} total={total} />
}

export default obc(Tips, COMPONENT)
