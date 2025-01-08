# Redux. Redux Toolkit, RTK Query. Context api.

## Application Requirements

1. Selected items (Redux):
   - Each item on the dashboard should have a checkbox, information about which items have been selected should be stored in the store;
   - When user navigates to the next page, and then goes back, previously selected items should be shown (if there were any);
   - When user unselects an item, it should be removed from the store;
2. Downloading selected items (Redux):
   - When at least 1 item has been selected, the flyout element should appear at the bottom;
   - The flyout element should contain number of selected elements (e.g. "3 items are selected") and 2 buttons: "Unselect all" and "Download";
   - When "Unselect all" button is clicked, all the selected items should be unselected and the flyout should be removed from the page;
   - When "Download" button is clicked, you should save the list of selected items (e.g. name, description, details url, any other useful information) to the .csv file, name should contain the number of selected items (e.g. if you've selected "episode" endpoint of the Star Trek api and selected 15 items, the name might be "15_episodes.csv")
3. Custom theme (Context API):
   - Add button/radio buttons/dropdown on top of the application for theme selection;
   - User should have an option to select one of the 2 themes (e.g. light or dark);
   - Selected theme should affect the appearance of the whole application

## Technical requirements

1. Create a separate branch for this task from the previous branch task. Branch name: "app-state-management".
2. Redux Integration:
   - Integrate Redux into your application. You'll need to set up the Redux store and reducers using Redux Toolkit.
3. RTK Query integration:
   - RTK Query Implementation: Use Redux Toolkit Query (RTK Query) to make API calls and cache the results. This will modify your previous API call implementation;
   - Use RTK Query to show whether the data is being loaded. Avoid prop-drilling, if it is required to show indicator in child component, put the respective flag in the store;
   - Items returned for the current page should be stored in the store;
   - Currently selected item details should be stored in the store.
4. Context API:
   - Add context to control the application theme (light or dark).
5. Test Updates
   - Update your tests to accommodate the changes introduced by Redux and RTK Query.
   - Test the functionality related to Redux state and API calls.
