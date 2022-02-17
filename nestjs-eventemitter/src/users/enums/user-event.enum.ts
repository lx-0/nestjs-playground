export enum UserEvent {
  /**
   *
   * @param {({oldState: UserState, updatedUser: IUserUnpopulated})} payload
   */
  UPDATED_STATE_SET_ACTIVE = 'user.updated.state.setActive',

  /**
   *
   * @param {({oldState: UserState, updatedUser: IUserUnpopulated})} payload
   */
  UPDATED_STATE_SET_INACTIVE = 'user.updated.state.setInactive',

  /**
   *
   * @param {({oldState: UserState, updatedUser: IUserUnpopulated})} payload
   */
  UPDATED_STATE_SET_DELETED = 'user.updated.state.setDeleted',

  /**
   *
   * @param {({oldState: UserState, updatedUser: IUserUnpopulated})} payload
   */
  UPDATED_STATE_SET_REJECTED = 'user.updated.state.setRejected',

  /**
   *
   * @param {({oldState: UserState, updatedUser: IUserUnpopulated})} payload
   */
  UPDATED_STATE_SET_BLOCKED = 'user.updated.state.setBlocked',

  /**
   *
   * @param {({oldEwhState: string, updatedUser: IUserUnpopulated})} payload
   */
  UPDATED_EWH_STATE = 'user.updated.ewhState',

  USER_REMOVED_EXCLUTION_FROM_B2B_POSTS = 'user.removedExclutionFromB2bPosts',

  USER_ADDED_EXCLUTION_FROM_B2B_POSTS = 'user.addedExclutionFromB2bPosts',

  /**
   * @param {IUserUnpopulated} deletedUser
   * @param {string} message
   */
  DELETED = 'user.deleted',

  CREATED = 'user.created',

  // ! @DEPRECATED EVENTS - Do not use events listed below!
}
