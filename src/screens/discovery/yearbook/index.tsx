/*
 * @Author: czy0729
 * @Date: 2021-07-15 20:23:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 02:08:36
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Page, ScrollView } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import Award2022 from '../index/component/award-2022'
import Award2023 from '../index/component/award-2023'
import Blocks from './component/blocks'
import Years from './component/years'
import Header from './header'
import { memoStyles } from './styles'

/** 年鉴 */
const Yearbook = () => {
  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-yearbook'>
        <Header />
        <Page>
          <ScrollView contentContainerStyle={styles.container} scrollToTop>
            <Award2023 width={styles.item2021.width} height={styles.item2021.height} />
            <View style={_.mt.md}>
              <Award2022 width={styles.item2021.width} height={styles.item2021.height} />
            </View>
            <Blocks />
            <Years />
          </ScrollView>
        </Page>
      </Component>
    )
  })
}

export default Yearbook
