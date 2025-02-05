const usersData = [
  {
    id: 1,
    firstName: 'Gabriel',
    lastName: 'Dantas'
  },
  {
    id: 2,
    firstName: 'Mike',
    lastName: 'Smith'
  }
];

const addresses = [
  {
    userId: 1,
    houseNumber: 1,
    street: 'Good Street',
    zipCode: 12345
  },
  {
    userId: 2,
    houseNumber: 2,
    street: 'Bad Street',
    zipCode: 54321
  }
];

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
    users: [User]
    address: Address
    addresses: [Address]
  }

  type Query {
    getUser(id: ID!): UserResponse!
    getAllUsers: UserResponse
  }

`

const resolvers = {
  Query: {
    getUser(parent, args) {
      const user = usersData.find((data) => data.id === args.id);
      const address = addresses.find((data) => data.userId === args.id);
      return {
        user,
        address
      }
    }
  },
  Mutation: {},
}