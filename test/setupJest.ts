require('jest-fetch-mock').enableMocks();
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});