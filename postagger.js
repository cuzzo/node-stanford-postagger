var xmlrpc = require("xmlrpc"),
    Trickster = require("./trickster").Trickster;

var trickster = new Trickster();

var Tagger = function(options) {
  options = options || {};

  var _client = xmlrpc.createClient({
    host: options.host || "localhost",
    port: options.port || 9000,
    path: "/"
  });

  /**
   * Issues an API call to Stanford POS Tagging service to POS tag text.
   *
   * @param string str
   *   A blob of text to tag.
   *
   * @return Array
   *   The POS tagged text, split into paragraphs.
   */
  this.tag = function(str, callback) {
    str = trickster.trick(str);
    _client.methodCall("tagger.runTagger", [str], function(err, resp) {
      if (err) return callback(err);
      callback(err, trickster.untrick(resp));
    });
  };

  this.denodeify = function(PromiseLibrary) {
    this.tag = PromiseLibrary.denodeify(this.tag);
    return this;
  };
};

module.exports.Tagger = Tagger;
