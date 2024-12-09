# React Routing. Tests.

## Technical Requirements

1. Create a separate branch for this task from the previous task's branch. Branch name: "hooks-and-routing".
2. All components must be changed to **functional components**, except **Error Boundary** components, as error boundaries in React still need to be class components.
   - Implement custom hook to restore search query from the local storage (LS). Use respective React lifecycle hook as a basis.
3. All logic should be split into components:
   - If you need an access either to the component's lifecycle or the state **use hooks**.
   - All data should be stored in the **component's state**.
4. Add routing to your application using **React Router**.
5. Add a 404 page when user navigates to non-existing route.
6. Add and configure a test runner: Jest or Vitest. Test runner should show the test coverage. You should aim to reach at least 80% of the test coverage.
7. Add a testing library: React Testing Library. You should add tests for the several scenarios keeping in mind that mocked data should be used instead of real API calls.
8. Tests for the Card List component:
   - Verify that the component renders the specified number of cards;
   - Check that an appropriate message is displayed if no cards are present.
9. Tests for the Card component:
   - Ensure that the card component renders the relevant card data;
   - Validate that clicking on a card opens a detailed card component;
   - Check that clicking triggers an additional API call to fetch detailed information.
10. Tests for the Detailed Card component:

- Check that a loading indicator is displayed while fetching data;
- Make sure the detailed card component correctly displays the detailed card data;
- Ensure that clicking the close button hides the component.

11. Tests for the Pagination component:

- Make sure the component updates URL query parameter when page changes.

12. Tests for the Search component:

- Verify that clicking the Search button saves the entered value to the local storage;
- Check that the component retrieves the value from the local storage upon mounting.

13. Lastly, update Husky to run tests on the pre-push hook, ensuring that tests are automatically executed before any code is pushed.
