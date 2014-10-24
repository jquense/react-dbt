var Boutique = require('boutique')
  , Clank = require('clank')
  , _ = require('lodash')


module.exports = Boutique.Store.extend({

  constructor: function BaseStore(dispatcher){
    var self = this;

    Boutique.Store.call(this, dispatcher)

    this.stores = _.transform(this.needs, function(obj, type){
      obj[type] = self.container.resolve('store:' + type)
    }, {})

    this.initialize && this.initialize()
  }

})


module.exports.setCompositionStrategy({
  needs: Clank.concat()
})