import { gql } from 'apollo-server-express';

const typeDefs = gql`

  interface INode  {
    id: ID!
  }

  scalar Date

  type Query {

    keplerDataUrl(from: Date!, till: Date!): String

  }
`;


export default typeDefs;
