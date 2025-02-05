const typeDefs = `#graphql

  type User {
    firstName: String! # ! means that the field is a Non-Null type
    lastName: String!
  }

  type Address {
    houseNumber: Int!
    street: String!
    zipCode: Int | String # | Union types
  }

  type UserResponse {
    user: User
    address: Address
  }

`

const resolvers = {
  Query: {},
  Mutation: {},
  Subscriptions: {},
  Address: {
    houseNumber: (address) => parseInt(address.houseNumber) // Updating especific fields
  },
  User: {
    lastName: (user) => console.log(user.lastName)
  }
}