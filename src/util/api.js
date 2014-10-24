var Clank = require('clank')
  , Url = require('url')
  , _ = require('lodash')
  , ajax = require('./ajax')
  , when = require('when')


module.exports = Clank.Object.extend({

    constructor: function ApiService(server, redirectUri){
      this.server = server
      this.redirectUri = redirectUri

      Clank.Object.call(this)

      this.authorized = false
      this.access_token =  localStorage.getItem('porch_access_token')
      this.refresh_token = localStorage.getItem('porch_refresh_token')
    },

    queryString: function(prefix){
      return (prefix ? '?' : '&') + 'access_token=' + this.access_token + '&token_type=Bearer'
    },

    request: function(url, params, opts){
      opts = opts || {};

      if ( !this.authenticated ) 
        return when.reject(new Error('not authenticated'));

      if ( opts.data ) params = _.extend({}, opts.data, params)

      opts = _.extend({}, opts, this.formatUrl(url, params), {
        crossDomain: true,
        dataType: 'json',
        headers: { 
          Authorization: 'Bearer ' + this.access_token
        }  
      });

      return ajax(opts)
    },
    
    formatUrl: function (url, params){
      var server = this.server
        , paramReg = /(:[^/]*?)(\/|$)/
        , pathParams = [ params ]
        , paramStr, param;

      while ( paramReg.test(url) ){
        paramStr = url.match(paramReg)[1];
        param    = paramStr.substring(1)
        url      = url.replace(paramStr, params[param] || '')

        pathParams.push(param)
      }

      url = url.replace('//', '').trim()
      url = url.charAt(url.length - 1) === '/' ? url.substring(0, url.length - 1) : url;

      return { 
        url:  server + url, 
        data: _.omit(params, pathParams) 
      }
    },

    authenticate: function(){
      var query = Url.parse(location.href, true).query
        , token = this.access_token
        , hash  = splitHash() || {}

      if ( token ) 
        return this.authenticated = true
      
      if ( location.pathname === this.redirectUri) {

        if (location.hash && hash.access_token) 
          this._setTokens(hash.access_token, hash.refresh_token)
        
        else if (query.code !== undefined) 
          this._requestAccessToken(this.redirectUri, query.code, 'my_client')

        else if (query.error )
          throw new Error(query.error + ': ' + query.error_description)
      }
      else
        this._requestAuthCode(this.redirectUri, 'my_client')
    },

    _requestAuthCode: function( landingPoint, clientId ){
      var redirect = location.origin + landingPoint
        , query = '/oauth/authorize?response_type=token&client_id=' + clientId + '&redirect_uri=' + redirect
      
      window.location = this.server + query
    },

    _requestAccessToken: function( redirect, code, clientId ){
      var self = this
        , url = this.server +'/oauth/token'
        , xhr = ajax({
            url: url,
            method: 'POST',
            data: {
              grant_type: 'authorization_code',
              client_id: clientId,
              redirect_uri: location.origin + redirect,
              code: code
            }    
          })
      
      return xhr.then(function(rsp){
        self._setTokens(resp.access_token, resp.refresh_token)
      })
    },

    _setTokens: function(access, refresh){
      access  && localStorage.setItem('porch_access_token', access)
      refresh && localStorage.setItem('porch_refresh_token', refresh)

      this.authenticated = !!access
      this.access_token  = access
      this.refresh_token = refresh
    }
})

function splitHash(){
  var qry = location.hash.substring(1)

  qry = qry.split('&')

  return _.transform(qry, function(rslt, item){
      var idx = item.indexOf('=')
        , key = item, val = '';
        
      if (idx >= 0) {
          key = item.substring(0, idx)    
          val = item.substring(idx + 1)
      }
      rslt[key] = val;
  }, {})
}