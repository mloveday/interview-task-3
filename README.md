# Sample work for interview

![Tests](https://github.com/mloveday/interview-task-3/workflows/Tests/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/mloveday/interview-task-3/badge.svg?branch=master)](https://coveralls.io/github/mloveday/interview-task-3?branch=master)

See the page in action on <a href="https://mloveday.github.io/interview-task-3" target="_blank">Github Pages</a>, deployed via github actions.

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

- Based on an interview task from spring 2020
- Initially time-windowed to 1 day, with kids running around in the background, i.e. it's not fully polished
    - Written from scratch, rather than relying on, say, create-react-app. This was a little more time-consuming, but also means it's not got any unnecessary cruft
    - I've used babel for handling typescript instead of ts-loader. Having done this, I think I prefer ts-loader
        - Note that the new tests do use typescript, so this build config may well change
- Not intended for production deployment
- Since completing the original task, I've added a few extra features that I think are quite important for something like this:
    - tests
    - github action running tests & uploading to coveralls
    - intention to refactor the less ideal bits to be more representative of more professional work
- Note that this is very much a work in progress and not (yet) really indicative of a fully complete task in a professional setting
- Some things that still require work:
    - compiling & serving should happen in the same command
        - I've previously not had to worry about this, as I'd used Symfony Encore, which hides this stuff from you and makes it super easy to just get working
    - there's no effort here to optimise the bundle in any way beyond using babel
    - linting is non-existent (I've used ts-lint in the past for this stuff)
    - ~~I've not specified a `tsconfig.json`, as I've used babel (first time using babel specifically for typescript)~~
        - See note regarding tests using typescript and testing - this is now present
        - I would normally opt for something like ts-loader or equivalent, which would use this config. My IDE can then hook into the config and show errors specific to the config as I'm coding
        - I've not really configured babel much - I'm assuming sensible defaults for the large part.
            - The spec said both ES6 and modern browsers - this is targeting modern browsers as babel > 6 doesn't make it easy to target specific specs
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
    - The new tests are quite repetitive and could do with a bit of a refactor - these are very much a work in progress