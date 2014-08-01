Node Stanford POS-tagger
========================

Let your node.js application think like a human.

Usage
-----

node-stanford-postagger has one usage, to interact with [Stanford's POS-tagger](http://nlp.stanford.edu/software/tagger.shtml). 

Dependencies
------------

* [Stanford's POS-tagger](http://nlp.stanford.edu/software/tagger.shtml)
* [Turian's XMLRPC service for Stanford's POS-tagger](https://github.com/turian/stanford-pos-tagger-service).
* [node.js](http://nodejs.org/])
* [npm](https://www.npmjs.org/)

To simply configure and install Stanford's POS-tagger with Turian's XMLPRC service, you can simply run my [Stanford POS-tagger Docker image](https://registry.hub.docker.com/u/cuzzo/stanford-pos-tagger/):

```bash
docker pull cuzzo/stanford-pos-tagger
docker run -t -i -p 9000:9000 cuzzo/stanford-pos-tagger
```

* [Get Docker](http://docs.docker.com/installation/) - It's just a few commands away.

Otherwise, carefully follow Stanford's and Turian's instructions. Be prepared to spend hours |= (Just get Docker).

Installation
------------

```bash
git clone https://github.com/cuzzo/node-stanford-postagger
cd node-stanford-postagger
npm install
```

How to Run the XMLRPC Service
------------------------------

As posted above, with Docker, it's as simple as:

```bash
docker pull cuzzo/stanford-pos-tagger
docker run -t -i -p 9000:9000 cuzzo/stanford-pos-tagger
```

Without Docker, I've included `util/run-server.sh` to simplify running Turian's XMLRPC service for Stanford's POS-tagger in a user-friendly way.

```bash
run-server.sh models/left3words-wsj-0-18.tagger 9000
```

The above runs the service using the built-in `left3words-wsj-0-18` training model on port `9000`. To run this script, it's required to live in the root directory of the stanford-postagger code--in the same directory as Turian's `tagger-server.jar` is required to be moved.

Interacting with the XMLRPC Service in node.js
----------------------------------------------

```bash
$ bin/tag "Hello, world!"
> [ 'Hello_UH ,_, world_NN !_.\n' ]
```

Interacting with the XMLRPC Service in Your node.js Project
-----------------------------------------------------------

```javascript
var Tagger = require("node-stanford-postagger/postagger").Tagger;
var tagger = new Tagger({
  port: "9000",
  host: "localhost"
});

tagger.tag("Hello, world!", function(err, resp) {
  console.log(err, resp);
});
```

If you don't like callbacks and prefer promises, node-stanford-postagger supports `denodeify`.

```javascript
var Q = require("q");
var Tagger = require("node-stanford-postagger/postagger").Tagger;
var tagger = new Tagger({
  port: "9000",
  host: "localhost"
});
tagger.denodify(Q);

tagger.tag("Hello, world!")
  .then(function(resp) {
      console.log(resp);
    },
    function(err) {
      console.log(err);
    }
  );
```

Acknowledgements
----------------

* [Ali Afshar's XMLRPC service for Stanford's POS-tagger](https://github.com/turian/stanford-pos-tagger-service) - This node.js client wouldn't exist without it.
* [The geniuses at Stanford](http://nlp.stanford.edu/people.shtml) - These guys were and are truly pioneering. This software gets the part of speech right 90% of the time, even when the word is unknown!

License
-------

node-stanford-postagger is free--as in BSD. Hack your heart out, hackers.

* NOTE: Stanford's POS Tagger itself is licensed GPL.
