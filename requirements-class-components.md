# React project setup. Class components. Error boundary.

## Application Requirements

1. Divide your page into at least two sections/components. The smaller section should be at the top, and the larger section should be at the bottom.
2. In the top section, place a _Search_ input and a "Search" button. The _Search_ component should look for a previously saved search term in the local storage (LS). If there isn't any, leave the input empty.
3. The bottom section should be used for displaying search results (name and a small description).
4. By default, the application makes a call to the selected API to get a list of items using the search term from the input (only the first page). If the input is empty, make a call to get all items.
5. When the user modifies the _Search_ input and clicks the "Search" button, the application makes a call to the API with the newly provided search term (the search term should not have any trailing spaces; process the input) to get the results (only the first page).
6. The provided search term should be saved to the LS. If the value exists, overwrite it.
7. If your application makes a request to the server API, this should be visible to the user. Implement a Spinner, Skeleton, Loading Bar, Blurring Content, or any other appropriate method in your UI to indicate this.
8. If the request didn't succeed (status code **4xx** or **5xx**), show the meaningful message. You can use [ModResponse](https://chromewebstore.google.com/detail/modresponse-mock-and-repl/bbjcdpjihbfmkgikdkplcalfebgcjjpm) or similar, to test this functionality.
9. Wrap the application in an error boundary to catch errors. Report an error to the console and show a fallback UI (use respective methods for this). Create a button that will throw an error on click to test the functionality.
