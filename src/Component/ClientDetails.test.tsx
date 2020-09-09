import 'jsdom-global/register';
import * as React from 'react';
import configureStore from 'redux-mock-store';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Link, BrowserRouter} from 'react-router-dom';
import {ClientDetails} from "./ClientDetails";
import {clientIdKey, clientSecretKey} from "../Service/Fetch";
import {resetCredentials} from "../Store/CredentialsState";

Enzyme.configure({adapter: new Adapter()})

jest.mock('../Store/AlbumState')

describe('ClientDetails component', () => {
  const createState = () => ({})

  const render = (mockStore) => Enzyme.mount(
    <Provider store={mockStore}>
      <BrowserRouter>
        <ClientDetails />
      </BrowserRouter>
    </Provider>
  );

  beforeEach(() => {
    localStorage.clear();
  })

  test('Given no credentials in local storage, shows blank form', () => {
    const mockState = createState();
    const mockStore = configureStore([thunk])(mockState);

    const result = render(mockStore);

    expect(result.find('#client-id-input').props().value).toEqual('');
    expect(result.find('#client-secret-input').props().value).toEqual('');
  })

  test('Given stored credentials in local storage, shows credentials in form', () => {
    const mockState = createState();
    const mockStore = configureStore([thunk])(mockState);
    const expectedId = 'expected-client-id';
    const expectedSecret = 'expected-client-secret';
    localStorage.setItem(clientIdKey, expectedId);
    localStorage.setItem(clientSecretKey, expectedSecret);

    const result = render(mockStore);

    expect(result.find('#client-id-input').props().value).toEqual(expectedId);
    expect(result.find('#client-secret-input').props().value).toEqual(expectedSecret);
  })

  test('Changing credentials and saving to local storage', () => {
    // given no credentials in local storage
    const mockState = createState();
    const mockStore = configureStore([thunk])(mockState);
    const expectedId = 'expected-client-id';
    const expectedSecret = 'expected-client-secret';
    const getClientIdWrapper = () => result.find('#client-id-input');
    const getClientSecretWrapper = () => result.find('#client-secret-input')

    // when rendered
    const result = render(mockStore);

    // then inputs are empty
    expect(getClientIdWrapper().props().value).toEqual('');
    expect(getClientSecretWrapper().props().value).toEqual('');

    // and when inputs are changed
    getClientIdWrapper().simulate('change', {target: {value: expectedId}});
    getClientSecretWrapper().simulate('change', {target: {value: expectedSecret}});

    // then inputs are updated
    expect(getClientIdWrapper().props().value).toEqual(expectedId);
    expect(getClientSecretWrapper().props().value).toEqual(expectedSecret);

    // and when save button is pressed
    result.find('#save-credentials').simulate('click');

    // then local storage is updated and redux action is dispatched
    expect(localStorage.setItem).toHaveBeenCalledWith(clientIdKey, expectedId);
    expect(localStorage.setItem).toHaveBeenCalledWith(clientSecretKey, expectedSecret);
    const actions = mockStore.getActions();
    expect(actions).toEqual([resetCredentials()]);
  })

  test('Removing credentials in local storage', () => {
    // given stored credentials in local storage
    const mockState = createState();
    const mockStore = configureStore([thunk])(mockState);
    const expectedId = 'expected-client-id';
    const expectedSecret = 'expected-client-secret';
    localStorage.setItem(clientIdKey, expectedId);
    localStorage.setItem(clientSecretKey, expectedSecret);

    const getClientIdWrapper = () => result.find('#client-id-input');
    const getClientSecretWrapper = () => result.find('#client-secret-input')

    // when rendered
    const result = render(mockStore);

    // then inputs are populated
    expect(getClientIdWrapper().props().value).toEqual(expectedId);
    expect(getClientSecretWrapper().props().value).toEqual(expectedSecret);

    // and when reset is clicked
    result.find('#remove-credentials').simulate('click');

    // then inputs are updated and local storage is updated and redux action is dispatched
    expect(getClientIdWrapper().props().value).toEqual('');
    expect(getClientSecretWrapper().props().value).toEqual('');
    expect(localStorage.removeItem).toHaveBeenCalledWith(clientIdKey);
    expect(localStorage.removeItem).toHaveBeenCalledWith(clientSecretKey);
    const actions = mockStore.getActions();
    expect(actions).toEqual([resetCredentials()]);
  })
})