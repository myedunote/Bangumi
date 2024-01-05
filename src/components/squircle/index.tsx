/*
 * @Author: czy0729
 * @Date: 2023-12-09 14:10:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 05:26:24
 */
import React from 'react'
import Svg, { Defs, ClipPath, Path } from 'react-native-svg'
import MaskedView from '@react-native-masked-view/masked-view'
import { systemStore } from '@stores'
import { Component } from '../component'
import Radius from './radius'
import { getMaskPath, getRadius } from './utils'
import { Props as SquircleProps } from './types'

export { SquircleProps }

/**
 * 仿 iOS 平滑圆角的实现
 *  - 若长和高一样, radius 大于等于长和高, 认为是圆
 *  - iOS 只使用 View 渲染默认圆角
 *  - android 使用 masked-view 配合 svg 做遮罩效果
 *  - web 使用 react-ios-corners 实现
 * */
export const Squircle = ({
  style,
  width = 0,
  height = 0,
  radius,
  children
}: SquircleProps) => {
  if (!radius || (!width && !height)) {
    return (
      <Component style={style} id='component-squircle'>
        {children}
      </Component>
    )
  }

  if (!systemStore.setting.squircle) {
    return (
      <Radius style={style} width={width} height={height} radius={radius}>
        {children}
      </Radius>
    )
  }

  const maskPath = getMaskPath({
    width: width || height,
    height: height || width,
    radius: getRadius(width, radius)
  })
  return (
    <Component style={style} id='component-squircle'>
      <MaskedView
        maskElement={
          <Svg width='100%' height='100%'>
            <Defs>
              <ClipPath id='mask'>
                <Path d={maskPath} />
              </ClipPath>
            </Defs>
            <Path fill='black' d={maskPath} clipPath='url(#mask)' />
          </Svg>
        }
      >
        {children}
      </MaskedView>
    </Component>
  )
}