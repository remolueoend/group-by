
/**
 * Extends the Array.prototype with a groupBy method
 * allowing to group an array by a specific key property.
 */
(function(){

    // Do not overwrite an existing implementation!
    if(typeof Array.prototype.groupBy !== 'function'){

        /**
         * Returns the value of the provided property path of an object.
         * Provided by: http://stackoverflow.com/users/6782/alnitak.
         * See: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
         *
         * @param {object} o The object which provides the property.
         * @param {String} s The property path to access.
         * @returns {*}
         * @private
         */
        function _resolvePropertyPath(o, s) {
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');           // strip a leading dot
            var a = s.split('.');
            for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if (k in o) {
                    o = o[k];
                } else {
                    return;
                }
            }
            return o;
        }

        /**
         * Returns a new array grouped by the key returned by keyFn.
         *
         * @param {function(item)|String} key Function returning the key to group by,
         * or the property string of the key to group by.
         * @returns new GroupedArray instance.
         **/
        Array.prototype.groupBy = function groupBy(key){
            var result = [], _this = this, k;
            var keyAcc = typeof key === 'function' ? key : function(obj){
                return _resolvePropertyPath(obj, key);
            };
            Object.defineProperty(result, 'isGrouped', { value: true });

            this.forEach(function(item){
                if(_this.isGrouped){
                    result.push({key: item.key, items: item.items.groupBy(keyFn)});
                }else{
                    k = keyAcc(item);
                    if(!result.some(function(pair){
                            if(pair.key === k){
                                pair.items.push(item);
                                // return true to break the loop:
                                return true;
                            }
                        })){
                        // add a new key-items pair to the result:
                        result.push({key: k, items: [item]});
                    }
                }
            });

            return result;
        };
    }
})();