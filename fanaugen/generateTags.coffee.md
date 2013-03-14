# generateTags
This is my approach to Dek Dekku's Tag Generator challenge (see [requirements][req]).
As a true coffee addict, I avoid writing raw JavaScript whenever possible. This document is written in [Literate CoffeeScript][lit], a recent addition to CoffeeScript that allows writing core right inside a Markdown file. It's source-code and documentation in one, with a focus on the documentation.

The very file is automatically converted to valid, readable JavaScript in by the command-line tool `coffee`, provided in the [coffee-script][cfs] Node.js package. Find the output in [`generateTags.js`][jsf]

[req]: https://github.com/nofatclips/generateTags#readme
[lit]: http://coffeescript.org/#literate
[cfs]: https://npmjs.org/package/coffee-script
[jsf]:  ../generateTags.js
[ife]: http://en.wikipedia.org/wiki/IIFE

So let's begin, shall we? (The following block comment will appear on top of the JS file)

    ###
    generateTags.js
    A JavaScript function that processes plain text or HTML (1st argument, as string)
    and produces a keyword frequency hash to facilitate tagging.
    Optional second argument: options object, governs the behaviour and output format.
    Can produce output suitable for the Wordle.net word cloud generator.

    This is free software (free as in free beer), published under the MIT license,
    see http://opensource.org/licenses/MIT

    This file is generated from its coffeescript source, see generateTags.coffee.md
    ###

## Usage and Options

Because CoffeeScript wraps everything in an [IIFE][ife] `(function(){...}).call(this);`, the `generateTags` function will be available in the `window` namespace and can usually be called without a prefix. It shall accept an options **object**, with default values as follows:

    defaults = 
      limit: 0                   # maximum number of most frequent words (0: no limit)
      blacklist: ""              # comma- or space separated strings to ignore (e.g. swear words)
                                 # in addition to stopwords
      ignoreStopwords: true      # see list of English stopwords below
      minLength: 0               # ignore shorter words (0: no minimum length)
      minFrequency: 0            # ignore words below a frequency threshold (0: no limit)
      ignoreCase: true           # by default, treat "House" and "house" as the same word
      retainProperNames: true    # don't ignore case when you see "Chuck Norris"
      ignorePunctuation: true    # only set this to false if it ¿really? matters to you
      ignoreNonTextTags: true    # ignore <script>, <style>, <img>, <video>, <audio> and friends
      outputFormat: 'list'       # Array, sorted by frequency descending
                                 # alternative values:
                                 #   'object' ==> {'blah':23,...}
                                 #   'wordle' ==> "blah:23\n...", for http://www.wordle.net/advanced
                                 
    
So if we call the function as `generateTags(html, {limit:10, minLength:3})`, it'll fetch all the other options from `defaults` and output a list of the 10 most frequent words with 3 or more characters.

We need some presets for the stopword list and the HTML tags to ignore (the latter lists are probably very incomplete, but who cares...).

    # this list was stolen from http://www.ranks.nl/resources/stopwords.html
    stopwords = "a about above after again against all am an and any are aren't as at be because been before being below between both but by can't cannot could couldn't did didn't do does doesn't doing don't down during each few for from further had hadn't has hasn't have haven't having he he'd he'll he's her here here's hers herself him himself his how how's i i'd i'll i'm i've if in into is isn't it it's its itself let's me more most mustn't my myself no nor not of off on once only or other ought our ours  ourselves out over own same shan't she she'd she'll she's should shouldn't so some such than that that's the their theirs them themselves then there there's these they they'd they'll they're they've this those through to too under until up very was wasn't we we'd we'll we're we've were weren't what what's when when's where where's which while who who's whom why why's with won't would wouldn't you you'd you'll you're you've your yours yourself yourselves"
    
    html_tags = "button head script map style audio video canvas svg data"

## Implementation

### Utility functions

This one will decode [HTML entities](http://www.w3.org/TR/html4/sgml/entities.html):

 - `&oslash;` becomes  `ø`
 - `&frac12;` becomes  `½`
 - `&#28450;`  becomes  漢

and so forth. __WARNING__: this only works inside a DOM environment because it needs a `document`. It'll fail in standalone JS. Source: <http://stackoverflow.com/a/2808386/1030985>

    htmlDecode = (input) ->
      return input unless document?
      (e = document.createElement 'div').innerHTML = input
      e.firstChild.nodeValue

### The actual function

    ###
    @param html: a string containing the HTML to be processed
    @param options: the options object, as follows (default values)
      limit: 0                   # maximum number of most frequent words (0: no limit)
      blacklist: ""              # comma- or space separated strings to ignore (e.g. swear words)
                                 # in addition to stopwords
      ignoreStopwords: true      # see list of English stopwords below
      minLength: 0               # ignore shorter words (0: no minimum length)
      minFrequency: 0            # ignore words below a frequency threshold (0: no limit)
      ignoreCase: true           # by default, treat "House" and "house" as the same word
      retainProperNames: true    # don't ignore case when you see "Chuck Norris"
      ignorePunctuation: true    # only set this to false if it ¿really? matters to you
      ignoreNonTextTags: true    # ignore <script>, <style>, <img>, <video>, <audio> and friends
      outputFormat: 'list'       # Array, sorted by frequency descending
    ###
    @generateTags = (html, options) ->

      opts = options or {}
      for x of defaults
        opts[x] = if opts[x] is undefined then defaults[x] else opts[x]
      
Now, let's get to the actual work, step by step.

### Cleanup 1: Eliminate HTML tags

Get rid of the tags that we want to ignore completely, such as `<script>...</script>`. The RegExp is case-insensitive, so it also catches things like `<HEAD>...</head>`

      if opts[ignoreNonTextTags]
        re = new RegExp "<(#{html_tags.replace(/\s/g,'|')}).+?</\\1>", "gi"
        html = html.replace re, ""
        
Next, throw away __all other__ HTML tags, replacing them with spaces to avoid jamming together words from adjacent tags, e.g. `<li>foo</li><li>bar</li>`:

      html = html.replace(/<.+?>/g, ' ')
      
### Cleanup 2: replace ISO entities

      html = htmlDecode(html);
      
### Cleanup 3: kill punctuation

There is no *one* correct way of doing this... 

      html = html.replace /[]/
      
