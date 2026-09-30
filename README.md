# Travel Journal: Morocco

Live Demo: https://ioanamargarint.github.io/Travel-Journal---Morocco/

## The Theme – Travel Journal
A travel journal website is a great way to combine responsive design with dynamic data loading. I chose this theme because it allows for a clear visual structure (itineraries, galleries, city information) while requiring various interactive elements like modals, theme toggles, and dynamic DOM manipulation.

## About the project
The application is an interactive travel journal built from scratch using only HTML, CSS, and Vanilla JavaScript, without any external frameworks. It presents a detailed itinerary through the Imperial Cities of Morocco. The site is structured to be performant, maintaining a clear separation between the layout, the styling, and the interactive logic.

## What the app can do

### Design and navigation
* The page layout adapts to any screen size using CSS Grid for the daily itinerary and Flexbox for the photo gallery.
* The site features a drop-down menu built entirely with CSS (using hover states and absolute positioning), without relying on JavaScript.
* Interactive elements include smooth CSS transitions and a continuous keyframe animation on the main banner.

### Interactivity
* You can toggle a Dark Mode theme. The application saves this preference in the browser's localStorage, so it persists even if you refresh the page.
* The information about the visited cities is not hardcoded. The app fetches the data asynchronously (using fetch API) from a local JSON file and renders it dynamically on the page.
* The photo gallery uses a custom modal (pop-up) built in JavaScript, supporting mouse interaction and keyboard events (closing via the Escape key).

### Form validation
* The contact form validates user input (like the email format and name length) using Regular Expressions (RegEx) before allowing submission.

## Implementation details
The JavaScript code handles asynchronous data fetching with try-catch blocks to prevent crashes. It also leverages native JS classes (Math, Date) to display a custom greeting based on the local time and to apply random color effects. UI interactions handle event propagation correctly to ensure modals behave as expected when clicking the background versus the content.
