import { ClientFunction } from 'testcafe';

const getURL = ClientFunction(() => window.location.href);

export { getURL };
