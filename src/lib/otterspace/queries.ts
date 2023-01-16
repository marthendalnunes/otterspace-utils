import gql from 'graphql-tag'

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
