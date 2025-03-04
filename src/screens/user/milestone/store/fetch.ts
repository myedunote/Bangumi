/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 01:08:23
 */
import { collectionStore, usersStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchUsers = () => {
    return usersStore.fetchUsers({
      userId: this.userId
    })
  }

  fetchUserCollections = (refresh: boolean = false) => {
    return collectionStore.fetchUserCollections(
      {
        subjectType: this.state.subjectType,
        type: this.state.type,
        order: this.state.order,
        userId: this.userId
      },
      refresh
    )
  }
}
