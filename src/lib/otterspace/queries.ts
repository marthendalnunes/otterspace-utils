import gql from 'graphql-tag'

export const GET_USER_RAFTS = gql`
  query Raft($owner: String) {
    rafts(where: { owner: $owner }) {
      id
      tokenId
      metadata {
        id
        name
        description
        image
      }
    }
  }
`

export const GET_RAFT_BADGE_SPECS = gql`
  query Raft($id: String) {
    raft(id: $id) {
      specs {
        id
        metadata {
          name
          image
        }
      }
    }
  }
`

export const GET_USER_BADGES = gql`
  query Badge($owner: String) {
    badges(where: { owner: $owner }) {
      id
      status
      from
      spec {
        id
        raft {
          id
        }
        metadata {
          image
          name
          description
        }
        uri
      }
    }
  }
`

export const GET_BADGE_SPEC_BADGES = gql`
  query BadgeSpec($id: String) {
    badgeSpec(id: $id) {
      badges {
        id
        status
        owner
      }
    }
  }
`
