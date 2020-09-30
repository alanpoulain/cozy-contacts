import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import filter from 'lodash/filter'
import get from 'lodash/get'

import { isQueryLoading, useQuery, hasQueryBeenLoaded } from 'cozy-client'
import { Content } from 'cozy-ui/transpiled/react/Layout'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Header from './Header'
import Toolbar from './Toolbar'
import ContactsList from './ContactsList/ContactsList.jsx'
import SpinnerContact from './Common/Spinner'
import { reworkContacts } from '../helpers/contacts'

import ContactGroups from './ContactCard/ContactGroups'
import { queryAllGroups } from '../helpers/queries'

export const ContentResult = ({
  hasServiceBeenLaunched,
  contactsWithIndexesResult,
  contactsWithNoIndexesResult
}) => {
  const { t } = useI18n()
  const allContactsFilter = {
    name: t('filter.all-contacts'),
    withNoAction: true,
    isGroup: false
  }
  const [selectedGroup, setSelectedGroup] = useState(allContactsFilter)

  const resultAllGroups = useQuery(
    queryAllGroups.definition,
    queryAllGroups.options
  )

  const dataHaveBeenLoaded =
    !isQueryLoading(contactsWithIndexesResult) &&
    !isQueryLoading(contactsWithNoIndexesResult) &&
    !contactsWithIndexesResult.hasMore &&
    !contactsWithNoIndexesResult.hasMore &&
    (!isQueryLoading(resultAllGroups) || hasQueryBeenLoaded(resultAllGroups))

  if (!dataHaveBeenLoaded)
    return <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />

  const selecteGroup = selectedGroup => {
    setSelectedGroup(selectedGroup)
  }

  const resetFilter = group => {
    if (get(group, '_id') === get(selectedGroup, '_id')) {
      setSelectedGroup(allContactsFilter)
    }
  }

  const contacts = reworkContacts(
    hasServiceBeenLaunched,
    contactsWithIndexesResult.data,
    contactsWithNoIndexesResult.data
  )

  let filteredContacts = contacts

  if (selectedGroup._id) {
    const filters = ['groups', { data: [selectedGroup] }]
    filteredContacts = filter(contacts, filters)
  }

  return (
    <>
      {contacts.length >= 1 && (
        <Header
          left={
            <ContactGroups
              allGroups={resultAllGroups.data}
              value={selectedGroup}
              onChange={selecteGroup}
              noOptionsMessage={() => t('filter.none')}
              preliminaryOptions={[allContactsFilter]}
              onGroupDeletion={resetFilter}
            />
          }
          right={<Toolbar />}
        />
      )}
      <Content>
        <ContactsList contacts={filteredContacts} />
      </Content>
    </>
  )
}

ContentResult.propTypes = {
  hasServiceBeenLaunched: PropTypes.bool.isRequired,
  contactsWithIndexesResult: PropTypes.object.isRequired,
  contactsWithNoIndexesResult: PropTypes.object.isRequired
}

export default ContentResult
