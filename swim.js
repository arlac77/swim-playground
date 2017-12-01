const Swim = require('swim');
const opts = {
  local: {
    host: '172.29.248.124:11000',
    meta: { application: 'info' } // optional
  },
  codec: 'msgpack', // optional
  disseminationFactor: 15, // optional
  interval: 100, // optional
  joinTimeout: 200, // optional
  pingTimeout: 20, // optional
  pingReqTimeout: 60, // optional
  pingReqGroupSize: 3, // optional
  suspectTimeout: 60, // optional
  udp: { maxDgramSize: 512 }, // optional
  preferCurrentMeta: true // optional
};
const swim = new Swim(opts);
const hostsToJoin = ['172.29.248.124:11000', '172.29.248.124:11001'];

swim.bootstrap(hostsToJoin, err => {
  if (err) {
    console.log(err);
    // error handling
    return;
  }

  // ready
  console.log(swim.whoami());
  console.log(swim.members());
  console.log(swim.checksum());

  // change on membership, e.g. new node or node died/left
  swim.on(Swim.EventType.Change, update => {
    console.log(update);
  });
  // update on membership, e.g. node recovered or update on meta data
  swim.on(Swim.EventType.Update, update => {
    console.log(update);
  });

  // shutdown
  //swim.leave();
});

/*
swim.bootstrap(hostsToJoin);

swim.on(Swim.EventType.Error, err => {
  console.log(err);
});
swim.on(Swim.EventType.Ready, () => {
  console.log(ready);
});
*/
