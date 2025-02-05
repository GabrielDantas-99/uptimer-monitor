const typeDefs = `#graphql

  type User {
    firstName: String! # ! means that the field is a Non-Null type
    lastName: String!
  }

  type Address {
    houseNumber: Int!
    street: String!
    zipCode: Int
  }

  type UserResponse {
    user: User
    address: Address
  }

`