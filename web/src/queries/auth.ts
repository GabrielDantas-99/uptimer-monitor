import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($user: Auth!) {
    registerUser(user: $user) {
      user {
        id
        username
        email
      }
      notifications {
        id
        groupName
        emails
      }
    }
  }
`;
