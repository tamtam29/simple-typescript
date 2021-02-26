import express from 'express';
import faker from 'faker';
import NodeCache from 'node-cache';

const app: express.Application = express();
const port: number = 3000;

const myCache: NodeCache = new NodeCache();
app.get('/', (req: express.Request, res: express.Response) => {
  let realCount: number = myCache.get( "realCount" ) ? myCache.get( "realCount" ) : 0;
  let type: string;

  if (req.query.hasOwnProperty('count')) {
    type = 'count';
    const paramCount: number = +req.query.count;
    realCount += paramCount;
    myCache.set( "realCount", realCount, 10000 );

  } else if (req.query.hasOwnProperty('reset')) {
    type = 'reset';
    realCount = +req.query.reset;
    myCache.set( "realCount", realCount, 10000 );
  }

  const sentence: string = `${faker.lorem.sentence(3)} - ${type} ${realCount}`; 
  res.send(sentence);
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});