// @flow
import { ApolloError } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import casual from 'casual';
import moment from 'moment';
import path from 'path';
import fs from 'fs';

import parse from 'csv-parse';
import fetch from 'node-fetch';
import csvWriter from 'csv-write-stream';

import KeplerData from './KeplerData';
import KeplerConfig from './KeplerConfig';
import originsData from '../data/origins.json';
import Origin from './Origin';

const csvHeaders = ['origin_id', 'origin_name', 'origin_lat', 'origin_lon', 'destination_id', 'destination_lat', 'destination_lon', 'destination_name', 'travel_time'];

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
  },
  Mutation: {

    refresh: async (_, {projectName} : {projectName : String}, context) => {

      let lines = [];

      const parser = parse({delimiter: ','}, async (err, data) => {
          lines = data;
      });

      const filePath = path.resolve(__dirname, `../data/${projectName}.csv`);
      const stream = fs.createReadStream(filePath).pipe(parser);

      await new Promise( (resolve, reject) => {
          stream.on('finish', resolve);
          stream.on('error', reject);
      });

      const writer = csvWriter({ headers: csvHeaders});
      const outfilePath = path.resolve(__dirname, `../data/${projectName}_out.csv`);
      writer.pipe(fs.createWriteStream(outfilePath, {flags: 'w'}));

      const res = await new Promise( (resolve, reject) => {

          let linesCount = 0;

          lines.map( (line, index) => {

            setTimeout( async() => {

                const [originId,originName,originLat,originLon,destinationId,destinationName,destinationLat,destinationLon] = line;
                if( parseFloat(originLat) ) {
                    const apiKey = 'AIzaSyAZ46YK7LBAW6gqxkgJ1AA6ForQ2mvhWUU';
                    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?destination=${destinationLat},${destinationLon}&key=${apiKey}&origin=${originLat},${originLon}&mode=transit`;

                    try {
                      const res = await fetch(apiUrl);
                      const json = await res.json();
                      if( json.routes.length ) {
                        const point = json.routes[0].legs[0];
                        const eta = Math.ceil(point.duration.value/60);

                        console.log(`ET: ${index}). ${eta}`);
                        writer.write({
                          origin_id: originId,
                          origin_name: originName,
                          origin_lat: originLat,
                          origin_lon: originLon,
                          destination_id: destinationId,
                          destination_lat: destinationLat,
                          destination_lon: destinationLon,
                          destination_name: destinationName,
                          travel_time: eta
                        });
                      }
                    } catch(err) {
                      console.error(err);
                      reject();
                    }
                }

                if( ++linesCount == lines.length )   {
                  resolve(outfilePath);
                  return;
                }

            }, 200 * index);


          });
      })

      return res;

    }

  }
};
