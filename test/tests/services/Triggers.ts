import { Triggers } from '../../../src';

describe('Triggers', () => {
  let service;
  const options = {
    token: process.env.PIPELINE_TRIGGER_TOKEN,
    ref: 'master'
  };
  
  before(() => {
    service = new Triggers({
      url: process.env.GITLAB_URL,
      token: process.env.PERSONAL_ACCESS_TOKEN,
    });
  });
  
  it.each([['token'], ['ref']])('should throw exception for missing property %s', (propertyName) => {
    const testCase = {
      ...options,
      [propertyName]: void 0,
    };
    
    expect(() => service.pipeline(1, testCase)).toThrow(`Missing required property: ${propertyName}`);
  });
  
  it('should trigger pipeline', async () => {
    const result = await service.pipeline(1, options);

    expect(result).toBeInstanceOf(Object);
  });
});
