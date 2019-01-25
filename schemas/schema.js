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

  type Query {

    origins : [Origin]
    keplerDataUrl(from: Date!, till: Date!): String

  }
`;


export default typeDefs;
