function generateTags (...) {


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

console.log(generateTags(html));
