// @flow
import { ApolloError } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import casual from 'casual';
import moment from 'moment';

import KeplerData from './KeplerData';
import KeplerConfig from './KeplerConfig';
import originsData from '../data/origins.json';
import Origin from './Origin';

export const resolvers = {

  Query: {
    keplerDataUrl: (_: any, {projectName, from, till} : {projectName: String, from: Date, till: Date}) => {
      return new KeplerData(projectName, from, till).getUrl();
    },
    keplerConfigUrl:(_: any, {projectName} : {projectName: String}) => {
      return new KeplerConfig(projectName).getUrl();
    },
    origins() {
      return originsData.origins.map( item => {
        return {
                  id:casual.uuid,
                  ...item
               }
        });
    }
  }

};
