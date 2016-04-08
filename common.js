console.log('This is common.js');

/**
 * Removes a module from the cache
 */
require.uncache = function (_module) {
	//Run over the cache looking for the files
	//loaded by the specified module name
	require.searchcache(_module, function (module) {
		delete require.cache[module.id];
	});

	//Remove cached paths to the module
	//Thanks to @bentael for pointing this out
	Object.keys(module.constructor._pathCache).forEach(function (cacheKey) {
		if (cacheKey.indexOf(_module) > 0) {
			delete module.constructor._pathCache[cacheKey];
		}
	});
};

/**
 * Runs over the cache to search for all the cached files
 */
require.searchcache = function (_module, callback) {
	//Resolve the module identified by the specified name
	var module = require.resolve(_module);

	//Check if the module has been resolved and found within the cache
	if (module && ((module = require.cache[module]) !== undefined)) {
		//Recursively go over the results
		(function run(module) {
			//Go over each of the module's children and run over it
			module.children.forEach(function (child) {
				run(child);
			});

			//Call the specified callback providing the found module
			callback(module);
		})(module);
	}
};

require.uncachedrequire = function (_module) {
	require.uncache(_module);
	return require(_module);
};

module.exports = {
	uncachedrequire: require.uncachedrequire
};