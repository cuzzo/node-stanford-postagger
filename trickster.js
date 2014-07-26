var MAGIC_TRICK_STRING = "<PPPPPP>";
var magic_regex = new RegExp(MAGIC_TRICK_STRING + "_.{2,3} \._\.\n", "g");

/**
 * Wraps text in a magic string so that paragraphs can be preserved
 * after the text is POS-tagged by the Stanford POS-tagger.
 */
var Trickster = function() {

  /**
   * Decorate the paragraphs of a text blob.
   * Call before tagging.
   *
   * @param string text
   *   The text to POS-tag.
   *
   * @param string
   *   The paragraph-decorated text blob.
   */
  this.trick = function(text) {
    var paragraphs = [];
    text.split("\n").forEach(function(paragraph) {
      paragraph = paragraph.trim();
      if (paragraph.length === 0) return;
      paragraphs.push(paragraph);
    });
    var temp_paragraphs = [];
    paragraphs.forEach(function(paragraph) {
      temp_paragraphs.push(paragraph);
      temp_paragraphs.push(MAGIC_TRICK_STRING + ".");
    });
    temp_paragraphs.pop();
    return temp_paragraphs.join("\n");
  };

  /**
   * Undecorates a POS-tagged text blob.
   * Call after tagging.
   *
   * @param string text
   *   The POS-tagged text.
   *
   * @param array
   *   The POS-tagged text, separated into paragarphs.
   */
  this.untrick = function(text) {
    return text.split(magic_regex);
  };
}

module.exports.Trickster = Trickster;
