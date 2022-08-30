const path = require('path');
const SWIPL = require('../dist').default;
const query = require('../dist').query;

describe('SWIPL', () => {
  it('should be a function', () => {
    expect(SWIPL).toBeInstanceOf(Function);
  });

  describe('Return on empty input', () => {
    let mod;

    beforeEach(async () => {
      mod = await SWIPL({});
    });

    it('should return an object containing FS, prolog and locateFile keys', async () => {
      expect(mod.FS).toBeInstanceOf(Object);
      expect(mod.prolog).toBeInstanceOf(Object);
      expect(mod.locateFile).toBeInstanceOf(Function);
    });

    it('should locate the file in the file system', () => {
      expect(mod.locateFile('myfile.txt')).toEqual('myfile.txt');
      expect(mod.locateFile('swipl-web.data')).toEqual(path.join(__dirname, '..', 'dist', 'swipl', 'swipl-web.data'));
    });

    it('prolog.call and prolog.query should be functions', () => {
      expect(mod.prolog.call).toBeInstanceOf(Function);
      expect(mod.prolog.query).toBeInstanceOf(Function);
      // expect(mod.prolog.call_string).toBeInstanceOf(Function);
      // expect(mod.locateFile('myfile.txt')).toEqual('myfile.txt');
      // expect(mod.locateFile('swipl-web.data')).toEqual(path.join(__dirname, '..', 'dist', 'swipl', 'swipl-web.data'));
    });

    it('FS.writeFile should be a function', () => {
      expect(mod.FS.writeFile).toBeInstanceOf(Function);
    });
  });

  it('should query correctly', async () => {
    const result = await query("member(X, [a, b, c]).");
    expect(result.once().X).toEqual('a');
  });
});
