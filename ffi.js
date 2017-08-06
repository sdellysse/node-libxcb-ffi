const ffi = require("ffi");
const DynamicLibrary = ffi.DynamicLibrary;
const ForeignFunction = ffi.ForeignFunction;
const VariadicForeignFunction = ffi.VariadicForeignFunction;
const RTLD_NOW = ffi.DynamicLibrary.FLAGS.RTLD_NOW;

// No-OP
const debug = () => {};

const EXT = {
    'linux':  '.so'
  , 'linux2': '.so'
  , 'sunos':  '.so'
  , 'solaris':'.so'
  , 'freebsd':'.so'
  , 'openbsd':'.so'
  , 'darwin': '.dylib'
  , 'mac':    '.dylib'
  , 'win32':  '.dll'
}[process.platform]


module.exports = Object.assign({}, ffi, {
  forLibrary: (libfile, funcs) => {
    if (libfile && libfile.indexOf(EXT) === -1) {
      return module.exports.forLibrary(`${ libfile }${ EXT }`, funcs);
    }

    const retval = {};

    const dl = new DynamicLibrary(libfile || null, RTLD_NOW)
    for (const [ name, { returns, params } ] of Object.entries(funcs)) {
      const functionPointer = dl.get(name);
      if (functionPointer.isNull()) {
        continue;
      }

      const func = ForeignFunction(functionPointer, returns, params.map(p => Object.values(p)[0]));

      retval[name] = (...args) => new Promise((resolve, reject) => func.async(...args, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      }));

      retval[`${ name }Sync`] = func;
    }

    return retval;
  },
});
