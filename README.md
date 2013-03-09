#Codecademy Advanced JS Challenge

##generateTags


###Scenario

We’re building a site for web designers to show their portfolio. The user can enter the URL of her works and our application build a nice gallery. However, we’re missing a function to file all these submissions. We’d like to attach tags to them. Moreover, we’d like to automatically generate suggestions for tags that the user can select and add to the submission without having to type them herself.

Since this is not a critical feature, we decided to implement it on the client side using JavaScript. We need a function that takes as input the submitted page and returns a list of the words from the page; obviously we are not interested in the HTML tags: the function must strip them out before extracting the words.
*Optionally*:

* the function may return the words ordered from the most frequent (the one that appears more times) to the least frequent;
* the function may return how many times each word appears, so that different CSS styles can be applied to words according to their relevance;
* the function may return only  words that are at least three characters long, or accept an additional `minimumLength` parameter. Smaller words are not interesting and should be discarded.

###Solution

We tought about different solutions and decided to design the function with one the following interfaces:

`generateTags (theHTMLasText)`

or:

`generateTags (theHTMLasText, aNumericLimit)`

or:

`generateTags (theHTMLasText, aNumericLimit, aBlackListOfWords)`

where:

* `theHTMLasText` is a string that contains the HTML retrieved from the web page submitted by the user (the retrieval is done by another function, we don’t need to worry about that: our function receives just a string);
* `aNumericLimit` is a positive number that defines a limit to how many words we want to return: that is, if the limit is `10`, the function should only return the first 10 words. This parameter is optional and defaults to `0`, that is “no limit”;
* `aBlackListOfWords` is an array of words that we want to exclude from the returned object. For example, we don’t want to return words such as “a”, “with”, “from”, “to”... because they don’t convey any meaningful information. This parameter is optional and defaults to `[]`, that is “return everything”.

We can implement which version we prefer. Obviously the one with 3 parameters would be ideal.

###Usage examples

For the version returning only the words:

>   `> var html = "<p>one and two and three <i>one three</i> three</p>"`

>   `> generateTags (html)`

>   `=> ["three", "one", "and", "two"]`

>    `> generateTags (html, 1)`

>    `=> ["three"]`

>    `> generateTags (html, 0, [and])`

>    `=> ["three", "one", "two"]`

For the version returning the words and the corresponding frequencies:

>   `> var html = "<p>one and two and three <i>one three</i> three</p>"`

>   `> generateTags (html)`

>   `=> [ ["three",3], ["one", 2], ["and", 2], ["two", 1] ]`

>    `> generateTags (html, 1)`

>    `=> [ ["three", 3] ]`

>    `> generateTags (html, 0, [and])`

>    `=> [ ["three",3], ["one", 2], ["two", 1] ]`

**NOTE**: This is just an example of the possible output: feel free to use a different structure than a bi-dimensional array!

###For extra credit:

Here's a list of additional features that would make our function even more useful. Feel free to give them a try if you need something more challenging:

* we’d like the function to be able to cope with interpunction, so that “word”, “word,” and “¡word!” are seen as the same “word”;
* we’d like the function to cope with different character case, so that “word”, “Word” and “WORD” are seen as the same “word”;
* we’d like the function to retain the case when possible: if “Codecademy” is always written with the capital “C”, then this is how it should appear in the output;
* we’d like the function to remove words that appear only once or, in general, whose frequency is lower than a certain threshold--where the threshold can either be a constant value, or a `minimumFrequency` argument passed to the function. Example:

>   `> var html = "<p>one and two and three <i>one three</i> three</p>"`

>   `> generateTags (html, 0, [and], 2) // frequency >= 2`

>   `=> [ [three, 3], [one, 2] ]`

* we'd like the function to be able to identify ISO Entities like `&nbsp;` (non breaking space) and `&uuml;` (ü) and convert them to the corresponding character;
* feel free to add more constraints for fun (use as less characters as possible, use a single chain of methods to return the result and so on...)
* surprise me :D

###Getting Started

Here’s a little something to get started. There are two big strings of HTML source code, one from Codecademy Labs and one from the Android website, source included to do your tests; but once you get your code working with them, test it with other web pages as well.

[template.js](template.js)

When you have a function that works satisfyingly, you might also want to implement a prototype of the user interface that analyzes the user web pages, calls the function to extract the tags, show them in the document and allow the user to select them and/or enter additional ones.

###Summary

Let's review what the function should do:

* In the easiest case: accept a single parameter, a string of text representing HTML code, strip all the HTML tags and return an array of words, ignoring ordering, case, interpunction, word limit, length limit, blacklists, thresholds and all other subtleties;
* In the hardest case: accept a first parameter, a string of text representing HTML code, and many other optional arguments representing constraints on the output (max number of words to return, minimum length, forbidden words, threshold on frequency...) as described above. Strip all the HTML tags and return a list of words (ordered from the most frequent to the least frequent) along with their corresponding frequency.
* Feel free to solve a case that is harder, easier or intermediate between these two extremes.

And that's all, folks.
