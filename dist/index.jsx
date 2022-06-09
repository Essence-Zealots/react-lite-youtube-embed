/**
* react-lite-youtube-embed v2.2.2
*  https://github.com/ibrahimcesar/react-lite-youtube-embed.git
*
*  Copyright (c) Ibrahim Cesar < email@ibrahimcesar.com > and project contributors.
*
*  This source code is licensed under the MIT license found in the
*  LICENSE file in the root directory of this source tree.
*
*  Author site: https://ibrahimcesar.cloud
*/
    'use strict';

var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function LiteYouTubeEmbed(props) {
    var preconnected = React__namespace.useState(false)[0];
    var iframe = React__namespace.useState(false)[0];
    var videoId = encodeURIComponent(props.id);
    var videoPlaylisCovertId = typeof props.playlistCoverId === 'string' ? encodeURIComponent(props.playlistCoverId) : null;
    var videoTitle = props.title;
    var posterImp = props.poster || "hqdefault";
    var paramsImp = "&".concat(props.params) || "";
    var mutedImp = props.muted ? "&mute=1" : "";
    var format = props.webp ? 'webp' : 'jpg';
    var vi = props.webp ? 'vi_webp' : 'vi';
    var posterUrl = props.thumbnail || (!props.playlist
        ? "https://i.ytimg.com/".concat(vi, "/").concat(videoId, "/").concat(posterImp, ".").concat(format)
        : "https://i.ytimg.com/".concat(vi, "/").concat(videoPlaylisCovertId, "/").concat(posterImp, ".").concat(format));
    var ytUrl = props.noCookie
        ? "https://www.youtube-nocookie.com"
        : "https://www.youtube.com";
    ytUrl = props.cookie
        ? "https://www.youtube.com"
        : "https://www.youtube-nocookie.com";
    var iframeSrc = !props.playlist
        ? "".concat(ytUrl, "/embed/").concat(videoId, "?autoplay=1&state=1").concat(mutedImp).concat(paramsImp)
        : "".concat(ytUrl, "/embed/videoseries?autoplay=1").concat(mutedImp, "&list=").concat(videoId).concat(paramsImp);
    var adNetworkImp = props.adNetwork || false;
    var iframeClassImp = props.iframeClass || "";
    var onIframeAdded = props.onIframeAdded || function () { };
    var height = props.height || "560";
    var width = props.width || "315";
    /*
      const warmConnections = () => {
        if (preconnected) return;
        setPreconnected(true);
      };
    
      const addIframe = () => {
        if (iframe) return;
        setIframe(true);
      };
    */
    React__namespace.useEffect(function () {
        if (iframe) {
            onIframeAdded();
        }
    }, [iframe]);
    return (React__namespace.createElement(React__namespace.Fragment, null,
        React__namespace.createElement("link", { rel: "preload", href: posterUrl, as: "image" }),
        React__namespace.createElement(React__namespace.Fragment, null, preconnected && (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement("link", { rel: "preconnect", href: ytUrl }),
            React__namespace.createElement("link", { rel: "preconnect", href: "https://www.google.com" }),
            adNetworkImp && (React__namespace.createElement(React__namespace.Fragment, null,
                React__namespace.createElement("link", { rel: "preconnect", href: "https://static.doubleclick.net" }),
                React__namespace.createElement("link", { rel: "preconnect", href: "https://googleads.g.doubleclick.net" })))))),
        React__namespace.createElement("iframe", { className: iframeClassImp, title: videoTitle, width: width, height: height, frameBorder: "0", allow: "encrypted-media; picture-in-picture", allowFullScreen: true, src: iframeSrc })));
}

module.exports = LiteYouTubeEmbed;
//# sourceMappingURL=index.jsx.map
