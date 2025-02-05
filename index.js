import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

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
    zipCode: Int 
  }

  type UserResponse {
    user: User
    users: [User]
    address: Address
    addresses: [Address]
  }

  type Query {
    getUser(id: Int!): UserResponse!
    getAllUsers: UserResponse
  }

`

const resolvers = {
  Query: {
    getUser(parent, args) {
      const user = usersData.find((data) => data.id === parseInt(args.id));
      const address = addresses.find((data) => data.userId === parseInt(args.id));
      return {
        user,
        address
      }
    }
  },
}

const server = new ApolloServer({ typeDefs, resolvers })
const { url } = await startStandaloneServer(server, { listen: { port: 8000 } });
console.log(`Server running at ${url}`)