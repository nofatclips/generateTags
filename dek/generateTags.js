function generateTags (html, options) {
    return html
        .replace(/&(nbsp|quot|lt|gt|amp|#x27|#x2F);/g, function() {
            var replacementFor = {
                "&nbsp;": ' ',
                "&quot;": '"',
                "&lt;": '<',
                "&gt;": '>',
                "&amp;": '&',
                "&#x27;": "'",
          	"&#x2F;": '/'
            };
			return function closure(entity) {
				return replacementFor[entity];
			};
		}())
        .replace(/<[^>]+>/g, " ") 
        .split(/[\W]+/)
        .reduce(function(count, word) {return count.__update(word);}, {
            __words: [],
            __update: function(word) {
                var w = word.toLowerCase();
                if (w in this) this.__words[this[w]][1]++;
                else this[w] = this.__words.push([word, 1]) -1;
                return this;
            }
        })
        .__words
        .filter(function() {
            options = options || {};
            var fList = (options.forbiddenList || [])
                .filter(function(w) {return w.toLowerCase();});
            var threshold = options.minimumFrequency || 0;
            var minLen = options.minimumLenght || 1;
            return function closure(word){
				var w = word[0].toLowerCase();
                return (word[1]>=threshold && 
                    word[0] &&
					word[0].length>=minLen &&
                    fList.every(function(fWord) {return fWord !== w;})
				);
            };
        }())
        .sort(function(a,b) {
            switch(options.order && options.order.toLowerCase()) {
                case "9-0": return a[1]<b[1];
                case "0-9": return b[1]<a[1];
                case "a-z": return b[0].toLowerCase()<a[0].toLowerCase();
                case "z-a": return a[0].toLowerCase()<b[0].toLowerCase();
            }
            return false;
        })
        .slice(0,options.maxWords||undefined)
		.map(function(w) {return (options.returnFrequency) ? w : w[0];});
}

var html ='<div id="help-faq">' + 
          '<div id="help-header">Frequently Asked Questions</div>' +

          '<div class="faq-question">What is Codecademy Labs?</div>'+
          '<div class="faq-answer">Right now, Labs is a really easy way ' +
          'for you to play with Ruby, Python, and JS without needing to ' +
          "download an editor.  In the future, you'll see more cool " +
          'experiments on the Labs section of our site.</div>' +

          '<div class="faq-question">What are some cool features of ' +
          'Codecademy Labs?</div>' +
          '<div class="faq-answer">' +
            '<ul>'+
              '<li>It works offline - see what happens when you turn off ' +
              'your internet access in the middle of a session</li>' +
              '<li>You can share your code snippets with friends and ' +
              'save your session</li>' +
              "<li>You can download the code you've worked on to play " +
              'with it on your desktop</li>' +
              '<li>It works on your iPhone and iPad! (Ruby and ' +
              'Python not yet supported)</li>' +
            '</ul>'+
          '</div>'+

            '<div class="faq-question">What if I ' + "don't know how to" +
            'use one of the languages?</div>' +
            '<div class="faq-answer">Use Codecademy to learn them! ' +
            'Check out <a href="http://www.codecademy.com/learn">Codecademy ' +
            'courses</a> to see what you can learn or check out the ' +
            'examples by clicking the "ex" button on each page!</div>' +

          '<div class="faq-question">Who can we thank for this ' +
          'awesomeness?</div>' +
          '<div class="faq-answer">Codecademy Labs is the work of the ' +
          'team at Codecademy, the easiest way to learn how to code.  ' +
          'Amjad Masad of Codecademy is responsible for much of Labs, a ' +
          'project built on top of his original work with Max ' +
          'Shawabkeh.</div>' +
          

          '<div class="faq-question">I have more questions!</div>'+
          '<div class="faq-answer">Check out the main ' +
          '<a href="http://www.codecademy.com/about_us">Codecademy '+
          'about page</a> to learn more about us!</div>' +

        '</div>';
        
        var html2 = ' <div id=\"jd-content\">\n\n\n    <div class=\"jd-descr\" itemprop=\"articleBody\">\n    <p>These design principles were developed by and for the Android User Experience Team to keep users\'\nbest interests in mind. Consider them as you apply your own creativity and design thinking. Deviate\nwith purpose.<\/p>\n\n<h2 id=\"enchant-me\">Enchant Me<\/h2>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"delight-me\">Delight me in surprising ways<\/h4>\n<p>A beautiful surface, a carefully-placed animation, or a well-timed sound effect is a joy to\nexperience. Subtle effects contribute to a feeling of effortlessness and a sense that a powerful\nforce is at hand.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_delight.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"real-objects-more-fun\">Real objects are more fun than buttons and menus<\/h4>\n<p>Allow people to directly touch and manipulate objects in your app. It reduces the cognitive effort\nneeded to perform a task while making it more emotionally satisfying.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_real_objects.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"make-it-mine\">Let me make it mine<\/h4>\n<p>People love to add personal touches because it helps them feel at home and in control. Provide\nsensible, beautiful defaults, but also consider fun, optional customizations that don\'t hinder\nprimary tasks.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_make_it_mine.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"get-to-know-me\">Get to know me<\/h4>\n<p>Learn peoples\' preferences over time. Rather than asking them to make the same choices over and\nover, place previous choices within easy reach.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_get_to_know_me.png\">\n\n  <\/div>\n<\/div>\n\n<h2 id=\"simplify-my-life\">Simplify My Life<\/h2>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"keep-it-brief\">Keep it brief<\/h4>\n<p>Use short phrases with simple words. People are likely to skip sentences if they\'re long.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_keep_it_brief.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"pictures-faster-than-words\">Pictures are faster than words<\/h4>\n<p>Consider using pictures to explain ideas. They get people\'s attention and can be much more efficient\nthan words.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_pictures.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"decide-for-me\">Decide for me but let me have the final say<\/h4>\n<p>Take your best guess and act rather than asking first. Too many choices and decisions make people\nunhappy. Just in case you get it wrong, allow for \'undo\'.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_decide_for_me.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"only-show-when-i-need-it\">Only show what I need when I need it<\/h4>\n<p>People get overwhelmed when they see too much at once. Break tasks and information into small,\ndigestible chunks. Hide options that aren\'t essential at the moment, and teach people as they go.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_information_when_need_it.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"always-know-where-i-am\">I should always know where I am<\/h4>\n<p>Give people confidence that they know their way around. Make places in your app look distinct and\nuse transitions to show relationships among screens. Provide feedback on tasks in progress.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_navigation.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"never-lose-my-stuff\">Never lose my stuff<\/h4>\n<p>Save what people took time to create and let them access it from anywhere. Remember settings,\npersonal touches, and creations across phones, tablets, and computers. It makes upgrading the\neasiest thing in the world.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_never_lose_stuff.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"looks-same-should-act-same\">If it looks the same, it should act the same<\/h4>\n<p>Help people discern functional differences by making them visually distinct rather than subtle.\nAvoid modes, which are places that look similar but act differently on the same input.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_looks_same.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"interrupt-only-if-important\">Only interrupt me if it\'s important<\/h4>\n<p>Like a good personal assistant, shield people from unimportant minutiae. People want to stay\nfocused, and unless it\'s critical and time-sensitive, an interruption can be taxing and frustrating.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_important_interruption.png\">\n\n  <\/div>\n<\/div>\n\n<h2 id=\"make-me-amazing\">Make Me Amazing<\/h2>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"give-me-tricks\">Give me tricks that work everywhere<\/h4>\n<p>People feel great when they figure things out for themselves. Make your app easier to learn by\nleveraging visual patterns and muscle memory from other Android apps. For example, the swipe gesture\nmay be a good navigational shortcut.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_tricks.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"its-not-my-fault\">It\'s not my fault<\/h4>\n<p>Be gentle in how you prompt people to make corrections. They want to feel smart when they use your\napp. If something goes wrong, give clear recovery instructions but spare them the technical details.\nIf you can fix it behind the scenes, even better.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_error.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"sprinkle-encouragement\">Sprinkle encouragement<\/h4>\n<p>Break complex tasks into smaller steps that can be easily accomplished. Give feedback on actions,\neven if it\'s just a subtle glow.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_sprinkle_encouragement.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"do-heavy-lifting-for-me\">Do the heavy lifting for me<\/h4>\n<p>Make novices feel like experts by enabling them to do things they never thought they could. For\nexample, shortcuts that combine multiple photo effects can make amateur photographs look amazing in\nonly a few steps.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_heavy_lifting.png\">\n\n  <\/div>\n<\/div>\n\n<div class=\"vspace size-2\">&nbsp;<\/div>\n\n<div class=\"layout-content-row\">\n  <div class=\"layout-content-col span-7\">\n\n<h4 id=\"make-important-things-fast\">Make important things fast<\/h4>\n<p>Not all actions are equal. Decide what\'s most important in your app and make it easy to find and\nfast to use, like the shutter button in a camera, or the pause button in a music player.<\/p>\n\n  <\/div>\n  <div class=\"layout-content-col span-6\">\n\n    <img src=\"\/design\/media\/principles_make_important_fast.png\">\n\n  <\/div>\n<\/div>\n';

        var html3 = "<article class=\"markdown-body entry-content\" itemprop=\"mainContentOfPage\"><h1>\n<a name=\"codecademy-advanced-js-challenge\" class=\"anchor\" href=\"#codecademy-advanced-js-challenge\"><span class=\"mini-icon mini-icon-link\"><\/span><\/a>Codecademy Advanced JS Challenge<\/h1>\n\n<h2>\n<a name=\"generatetags\" class=\"anchor\" href=\"#generatetags\"><span class=\"mini-icon mini-icon-link\"><\/span><\/a>generateTags<\/h2>\n\n<h3>\n<a name=\"scenario\" class=\"anchor\" href=\"#scenario\"><span class=\"mini-icon mini-icon-link\"><\/span><\/a>Scenario<\/h3>\n\n<p>We’re building a site for web designers to show their portfolio. The user can enter the URL of her works and our application build a nice gallery. However, we’re missing a function to file all these submissions. We’d like to attach tags to them. Moreover, we’d like to automatically generate suggestions for tags that the user can select and add to the submission without having to type them herself.<\/p>\n\n<p>Since this is not a critical feature, we decided to implement it on the client side using JavaScript. We need a function that takes as input the submitted page and returns a list of the words from the page; obviously we are not interested in the HTML tags: the function must strip them out before extracting the words.\n<em>Optionally<\/em>:<\/p>\n\n<ul>\n<li>the function may return the words ordered from the most frequent (the one that appears more times) to the least frequent;<\/li>\n<li>the function may return how many times each word appears, so that different CSS styles can be applied to words according to their relevance;<\/li>\n<li>the function may return only  words that are at least three characters long, or accept an additional <code>minimumLength<\/code> parameter. Smaller words are not interesting and should be discarded.<\/li>\n<\/ul><h3>\n<a name=\"solution\" class=\"anchor\" href=\"#solution\"><span class=\"mini-icon mini-icon-link\"><\/span><\/a>Solution<\/h3>\n\n<p>We tought about different solutions and decided to design the function with one the following interfaces:<\/p>\n\n<p><code>generateTags (theHTMLasText)<\/code><\/p>\n\n<p>or:<\/p>\n\n<p><code>generateTags (theHTMLasText, aNumericLimit)<\/code><\/p>\n\n<p>or:<\/p>\n\n<p><code>generateTags (theHTMLasText, aNumericLimit, aBlackListOfWords)<\/code><\/p>\n\n<p>where:<\/p>\n\n<ul>\n<li>\n<code>theHTMLasText<\/code> is a string that contains the HTML retrieved from the web page submitted by the user (the retrieval is done by another function, we don’t need to worry about that: our function receives just a string);<\/li>\n<li>\n<code>aNumericLimit<\/code> is a positive number that defines a limit to how many words we want to return: that is, if the limit is <code>10<\/code>, the function should only return the first 10 words. This parameter is optional and defaults to <code>0<\/code>, that is “no limit”;<\/li>\n<li>\n<code>aBlackListOfWords<\/code> is an array of words that we want to exclude from the returned object. For example, we don’t want to return words such as “a”, “with”, “from”, “to”... because they don’t convey any meaningful information. This parameter is optional and defaults to <code>[]<\/code>, that is “return everything”.<\/li>\n<\/ul><p>We can implement which version we prefer. Obviously the one with 3 parameters would be ideal.<\/p>\n\n<h3>\n<a name=\"usage-examples\" class=\"anchor\" href=\"#usage-examples\"><span class=\"mini-icon mini-icon-link\"><\/span><\/a>Usage examples<\/h3>\n\n<p>For the version returning only the words:<\/p>\n\n<blockquote>\n<p><code>&gt; var html = \"&lt;p&gt;one and two and three &lt;i&gt;one three&lt;\/i&gt; three&lt;\/p&gt;\"<\/code><\/p>\n\n<p><code>&gt; generateTags (html)<\/code><\/p>\n\n<p><code>=&gt; [\"three\", \"one\", \"and\", \"two\"]<\/code><\/p>\n\n<p><code>&gt; generateTags (html, 1)<\/code><\/p>\n\n<p><code>=&gt; [\"three\"]<\/code><\/p>\n\n<p><code>&gt; generateTags (html, 0, [and])<\/code><\/p>\n\n<p><code>=&gt; [\"three\", \"one\", \"two\"]<\/code><\/p>\n<\/blockquote>\n\n<p>For the version returning the words and the corresponding frequencies:<\/p>\n\n<blockquote>\n<p><code>&gt; var html = \"&lt;p&gt;one and two and three &lt;i&gt;one three&lt;\/i&gt; three&lt;\/p&gt;\"<\/code><\/p>\n\n<p><code>&gt; generateTags (html)<\/code><\/p>\n\n<p><code>=&gt; [ [\"three\",3], [\"one\", 2], [\"and\", 2], [\"two\", 1] ]<\/code><\/p>\n\n<p><code>&gt; generateTags (html, 1)<\/code><\/p>\n\n<p><code>=&gt; [ [\"three\", 3] ]<\/code><\/p>\n\n<p><code>&gt; generateTags (html, 0, [and])<\/code><\/p>\n\n<p><code>=&gt; [ [\"three\",3], [\"one\", 2], [\"two\", 1] ]<\/code><\/p>\n<\/blockquote>\n\n<p><strong>NOTE<\/strong>: This is just an example of the possible output: feel free to use a different structure than a bi-dimensional array!<\/p>\n\n<h3>\n<a name=\"for-extra-credit\" class=\"anchor\" href=\"#for-extra-credit\"><span class=\"mini-icon mini-icon-link\"><\/span><\/a>For extra credit:<\/h3>\n\n<p>Here\'s a list of additional features that would make our function even more useful. Feel free to give them a try if you need something more challenging:<\/p>\n\n<ul>\n<li>we’d like the function to be able to cope with interpunction, so that “word”, “word,” and “¡word!” are seen as the same “word”;<\/li>\n<li>we’d like the function to cope with different character case, so that “word”, “Word” and “WORD” are seen as the same “word”;<\/li>\n<li>we’d like the function to retain the case when possible: if “Codecademy” is always written with the capital “C”, then this is how it should appear in the output;<\/li>\n<li>we’d like the function to remove words that appear only once or, in general, whose frequency is lower than a certain threshold--where the threshold can either be a constant value, or a <code>minimumFrequency<\/code> argument passed to the function. Example:<\/li>\n<\/ul><blockquote>\n<p><code>&gt; var html = \"&lt;p&gt;one and two and three &lt;i&gt;one three&lt;\/i&gt; three&lt;\/p&gt;\"<\/code><\/p>\n\n<p><code>&gt; generateTags (html, 0, [and], 2) \/\/ frequency &gt;= 2<\/code><\/p>\n\n<p><code>=&gt; [ [three, 3], [one, 2] ]<\/code><\/p>\n<\/blockquote>\n\n<ul>\n<li>we\'d like the function to be able to identify ISO Entities like <code>&amp;nbsp;<\/code> (non breaking space) and <code>&amp;uuml;<\/code> (ü) and convert them to the corresponding character;<\/li>\n<li>feel free to add more constraints for fun (use as less characters as possible, use a single chain of methods to return the result and so on...)<\/li>\n<li>surprise me :D<\/li>\n<\/ul><h3>\n<a name=\"getting-started\" class=\"anchor\" href=\"#getting-started\"><span class=\"mini-icon mini-icon-link\"><\/span><\/a>Getting Started<\/h3>\n\n<p>Here’s a little something to get started. There are two big strings of HTML source code, one from Codecademy Labs and one from the Android website, source included to do your tests; but once you get your code working with them, test it with other web pages as well.<\/p>\n\n<p><a href=\"\/nofatclips\/generateTags\/blob\/master\/template.js\">template.js<\/a><\/p>\n\n<p>When you have a function that works satisfyingly, you might also want to implement a prototype of the user interface that analyzes the user web pages, calls the function to extract the tags, show them in the document and allow the user to select them and\/or enter additional ones.<\/p>\n\n<h3>\n<a name=\"summary\" class=\"anchor\" href=\"#summary\"><span class=\"mini-icon mini-icon-link\"><\/span><\/a>Summary<\/h3>\n\n<p>Let\'s review what the function should do:<\/p>\n\n<ul>\n<li>In the easiest case: accept a single parameter, a string of text representing HTML code, strip all the HTML tags and return an array of words, ignoring ordering, case, interpunction, word limit, length limit, blacklists, thresholds and all other subtleties;<\/li>\n<li>In the hardest case: accept a first parameter, a string of text representing HTML code, and many other optional arguments representing constraints on the output (max number of words to return, minimum length, forbidden words, threshold on frequency...) as described above. Strip all the HTML tags and return a list of words (ordered from the most frequent to the least frequent) along with their corresponding frequency.<\/li>\n<li>Feel free to solve a case that is harder, easier or intermediate between these two extremes.<\/li>\n<\/ul><p>And that\'s all, folks.<\/p><\/article>";

//console.log(generateTags(html,2));
var blacklist = ["the", "can", "what", "you", "and", "are", "but", "than", "for",
    "not", "just", "into", "like", "over", "when", "where", "why", "which",
    "from", "that", "this", "those", "these", "only", "some", "any", "all",
    "one", "none", "two", "three", "four", "five", "yes", "no",
    "about", "other", "least", "most", "much", "many", "more",
    "should", "could", "would"];

console.log ("Without options:\n");

console.log(generateTags(html3));

console.log ("\nWith options:\n");

console.log(generateTags(html3, {
    maxWords: 0, 
    forbiddenList: blacklist, 
    minimumLenght: 5, 
    minimumFrequency: 3,
    returnFrequency: true,
    order: "A-z"
}));
