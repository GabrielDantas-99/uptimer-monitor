import { gql } from '@apollo/client';

const authDataFragment = gql`
  fragment AuthData on AuthResponse {
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
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($user: Auth!) {
    registerUser(user: $user) {
      ...AuthData
    }
  }
  ${authDataFragment}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      ...AuthData
    }
  }
  ${authDataFragment}
`;
