/*
 * @Doc: https://github.com/oblador/react-native-collapsible
 * @Author: czy0729
 * @Date: 2022-06-25 17:18:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-25 17:25:57
 */
import React, { useState, useEffect } from 'react'
import CollapsibleComponent from 'react-native-collapsible'
import { Props as CollapsibleProps } from './types'

export { CollapsibleProps }

export function Collapsible({ collapsed, children }: CollapsibleProps) {
  const [renderChildrenCollapsed, setRenderChildrenCollapsed] = useState(
    collapsed ? false : true
  )
  useEffect(() => {
    if (!collapsed && renderChildrenCollapsed === false) {
      setRenderChildrenCollapsed(true)
    }
  }, [collapsed, renderChildrenCollapsed])
  return (
    <CollapsibleComponent
      collapsed={collapsed}
      renderChildrenCollapsed={renderChildrenCollapsed}
    >
      {children}
    </CollapsibleComponent>
  )
}