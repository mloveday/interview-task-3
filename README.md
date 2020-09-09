# interview-task-3

![Tests](https://github.com/mloveday/interview-task-3/workflows/Tests/badge.svg?branch=master)

## Pre-requisites
- Node 12 (LTS)
- yarn

## Getting started
- Check out
- Run `yarn install`

## Running locally
- Run `yarn compile` to compile
    - Alternatively, in a Jetbrains IDE, run the `compile` run configuration
- Run `yarn serve` to create a dev server to host the site
    - Alternatively, in a Jetbrains IDE, run the `serve` run configuration
- Visit localhost:8000 in a browser
    - install redux dev tools in your browser to see what's happening in the store
    - react also have dev tools for seeing what's being rendered and profiling and whatnot
    
## Running tests
- Run `yarn jest`
    - Alternatively, in a Jetbrains IDE, run the `test` run configuration or `test watch` to watch for changes & re-run

## Deployment
- Not intended for deployment :)

## Notes & caveats

- I time-windowed this to around a day, with kids running around in the background, so it's not going to be fully polished!
- The spec said javascript, I chose typescript as it massively reduces mental load and speeds everything up. Plus, it compiles to the same thing anyway :)
- I opted for starting from scratch rather than bootstrapping from, say, create-react-app. I'm not sure this was ideal...
    - a few places are just good enough for now - there's little benefit to working around specific issues in (e.g.) build processes when it's a single-use repo
- It requires a lot more work if it were to be used in a production environment:
    - compiling & serving should happen in the same command
        - I've previously not had to worry about this, as I'd used Symfony Encore, which hides this stuff from you and makes it super easy to just get working
    - there's no effort here to optimise the bundle in any way beyond using babel
    - linting is non-existent (I've used ts-lint in the past for this stuff)
    - I've not specified a `tsconfig.json`, as I've used babel (first time using babel specifically for typescript)
        - I would normally opt for something like ts-loader or equivalent, which would use this config. My IDE can then hook into the config and show errors specific to the config as I'm coding
        - I've not really configured babel much - I'm assuming sensible defaults for the large part.
            - The spec said both ES6 and modern browsers - this is targeting modern browsers as babel > 6 doesn't make it easy to target specific specs
    - There aren't any tests
        - Given I'm using hooks and all sorts of context, it makes testing components a little more tricky
            - e.g. previously with redux you would wrap an individual component to inject the redux goodness into it. This separated the state management from the component, whereas with hooks it's all mixed together
        - I'd approach the component testing by creating some simple helpers to bootstrap a mock store and whatever else is needed (e.g. location):
        - ```javascript
            const mockStore = createStore(reducer, { foo: 'bar' });
            mockStore.dispatch = jest.fn();
            // interact with a button or something else you would expect to force a dispatch to happen
            expect(mockStore.dispatch).toHaveBeenCalledWith(someAction());
          ```
        - Reducer testing is pretty straightforward - it's just a function and is testing input -> output. Likewise for util functions.
        - async calls all happen in thunks in this project, and would be tested as per [the redux docs](https://redux.js.org/recipes/writing-tests)
    - styling is very basic, and largely based on [mvp.css](https://andybrewer.github.io/mvp/)
        - it's usable!
        - spending some more thought & time on it would result in something a little prettier
    - Some code wouldn't have passed a code review by myself
        - notably the state for bootstrapping the single album where it's not in the list should either have its own state, or just use some local state
        - there's virtually no error handling on the API requests - I'm assuming the best path with this code
        - the Routing code around credentials is a little tortuous, as it uses some redux state literally only to force a reload of the localStorage state
            - this would probably be better done by relying solely on redux, and using localStorage to populate it initially, rather than kinda the other way around
            - fun times could be had by using something like [redux-localstorage](https://www.npmjs.com/package/redux-localstorage) to manage this
        - the handling of the response objects is a little rubbish
            - we're not storing metadata about the response in the store, which makes pagination hard
            - the list view uses the largest image available, rather than the most appropriately sized one
        - The project structure is only really good enough for a one trick pony site - beyond some basic top level directories it's just flat, and wouldn't scale well...
        - State management could be improved: I've had success in the past using classes with defined methods on them to manipulate state, it keeps all of the state changes encapsulated within a single class and reduces the need for external services
