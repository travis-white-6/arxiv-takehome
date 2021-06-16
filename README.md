CONTENTS OF THIS FILE
---------------------

 * How To Run
 * Key Design Decisions
 * Issues Encountered
 * Notes and Assumptions
 * Future Expansions


HOW TO RUN
------------

The app is live to play with at the url https://arxiv-new-ui.web.app/

In order to run locally, you can clone the repo and install requirements from the package.json file. You can use `npm install` to do this. Then start the react app using `npm run`

There are a few unit tests, but by no means an extensive suite. I ran short on time and did not implement as many as I would have liked. To run the React logic and component unit tests run `npm run screen_test`. The mocha tests meant to test helpers / API were not implemented.


KEY DESIGN DECISIONS
------------

 * I choose to use React because I assumed it would be the easiest to get up and running quickly given that the constraints mentioned the goal of having a better UI than arXiv. Looking back it would have likely been easier to use Python and Django for a few reasons notably 
   - I have found it much easier to make sleek and stylish UIs with React (Google Material UI lib, CSS stylesheet familiarity) compared to Django but I'm sure if I dug into the Django documents enough I could make something comparable.
   - I am not as familiar with React unit testing as I am with Python unit testing. I have used mocha quite a lot but ran into issues with conflicting imports from `import {function} from 'file'` and `const assert = require('assert')` which I think is fixed in typescript but I'd have to play with it more.
   - I did not think that I would need to set up a more data intensive application than appears necessary. Because I could not easily query the provided arXiv API to get author data using Django with an easily configurable sql lite DB / external DB would have likely been easier

 * I deployed the app using Google Firebase because I'm quite familiar with that set up for react apps and it takes about 10 minutes to set up and configure. Also since other aspects were not fully completed I thought this might be a nice touch.

 * On the Articles List page and the Page for a single Author I have implemented infinite scroll logic to pull from the arXiv API. Again since there isn't a time filter for the query I found this easier and more robust to implement - compared to pulling data, post processing, then displaying the data all we do is pull and display. 

ISSUES ENCOUNTERED
-------------
 
 * I could not find where, using the information listed here in the manual https://arxiv.org/help/api/user-manual, to send an API request to the end point to satisfy the constraints for part 2 of the test project. I tried to figure out how to craft a query in such a way that we can get the author information but that does not seem possible given their limited use of the `au:` filter. The endpoint only seems to support querying on the article data not the artist data. In order to calculate the artist data needed I would need to get all of the arXiv articles and determine what's needed for how many articles they’ve written over the last 6 months, sorted with the newest, most prolific authors first. From the API docs it seems like we would need to download the entire database, store it somewhere, and filter on that data to determine what's needed. Theres also no reliable way to query to "get the past 6 months" without using `start` and `max_results` in the GET request and guessing how many articles to fetch to calculate what the authors data would be.

 * Unit testing did not go as easily as planned. I forgot that conflicting imports would cause issues (as noted above) for mocha tests that I planned on having to test the logic. I'm sure there is a solution / work around but I ran out of time and could not figure it out in time. The React logic and component unit testing went okay - but I am not as familiar with the set up and running so it took a bit longer than expected and. 


NOTES AND ASSUMPTIONS
-------------
 
 * This ended up taking approximately 6.5 hours to get to the state the app is currently in. I wish I could have done more on the Author page but there is not an easy clever way I can think of given the constraints. I approximate it would take another 2-3 hours to get working fully. 

 * I assume that there is no way of accessing the data needed for part 2 (author data) from any endpoints offered directly from arXiv and their API. I spent approximately 45 minutes sifting through as many docs as I could find and could not find a solution to help. I might be wrong / maybe looked at the wrong spot but I do not know.

 * I assume the app is meant for web based browsers on a desktop / laptop. With more time I would need to add cases for mobile web vs desktop web.


FUTURE EXPANSIONS
-------------

 * Add my own filter params via free text input on the landing page to include on what the API requests from arXiv
 * Login capabilities through likely through Firebase (quite straightforward process)
 * Universal search bar to query on any arXiv scholarly work
