import { gql } from 'apollo-server-express';

const typeDefs = gql`

  interface INode  {
    id: ID!
  }

  scalar Date

  type Origin implements INode {

    id: ID!

    originId: Int
    name: String
  }

  type Mutation {
    refresh(projectName: String!): String
  }

  type Query {

    origins : [Origin]
    keplerDataUrl(projectName: String!, from: Date!, till: Date!): String
    keplerConfigUrl(projectName: String!): String

  }
`;


export default typeDefs;
