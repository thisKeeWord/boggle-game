function Trie() {
  this.dictionary = {};
  this.$ = false;
}


Trie.prototype.add = function(string) {
  string = string.toLowerCase();

  // If the string has only one letter, mark this as a word.
  if(string.length === 0) {
    var wasWord = this.$;
    this.$ = true;
    return wasWord;
  }

  var nextChar = string[0];

  // Make sure theres a Trie node in our dictionary
  var next = this.dictionary[nextChar];

  if(!next) {
    this.dictionary[nextChar] = new Trie;
    next = this.dictionary[nextChar];
  }

  // Continue adding the string
  return next.add(string.substring(1));
};



// returns true if the string can prefix a valid english word
// e.g. "modul", although not a word, will return true because it prefixes "module"
Trie.prototype.isPrefix = function(prefix) {

  prefix = prefix.toLowerCase();

  if (prefix.length === 0) {
    return true;
  }

  var nextChar = prefix[0];

  if (!(nextChar in this.dictionary)) {
    return false;
  }

  return this.dictionary[nextChar].isPrefix(prefix.substring(1));
};


Trie.prototype.contains = function(string) {
  string = string.toLowerCase();

  if(string.length === 0) {
    return this.$;
  }

  // Otherwise, we need to continue searching
  var nextChar = string[0];
  var next = this.dictionary[nextChar];

  // If we don't have a node, this isn't a word
  if(!next) {
    return false;
  }

  // Otherwise continue the search at the next node
  return next.contains(string.substring(1));
};


module.exports = Trie;
