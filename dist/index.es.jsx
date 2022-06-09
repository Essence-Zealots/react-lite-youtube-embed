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
    import * as React from 'react';

function LiteYouTubeEmbed(props) {
    var preconnected = React.useState(false)[0];
    var iframe = React.useState(false)[0];
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
        ? "".concat(ytUrl, "/embed/").concat(videoId, "?state=1").concat(mutedImp).concat(paramsImp)
        : "".concat(ytUrl, "/embed/videoseries?").concat(mutedImp, "&list=").concat(videoId).concat(paramsImp);
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
    React.useEffect(function () {
        if (iframe) {
            onIframeAdded();
        }
    }, [iframe]);
    return (React.createElement(React.Fragment, null,
        React.createElement("link", { rel: "preload", href: posterUrl, as: "image" }),
        React.createElement(React.Fragment, null, preconnected && (React.createElement(React.Fragment, null,
            React.createElement("link", { rel: "preconnect", href: ytUrl }),
            React.createElement("link", { rel: "preconnect", href: "https://www.google.com" }),
            adNetworkImp && (React.createElement(React.Fragment, null,
                React.createElement("link", { rel: "preconnect", href: "https://static.doubleclick.net" }),
                React.createElement("link", { rel: "preconnect", href: "https://googleads.g.doubleclick.net" })))))),
        React.createElement("iframe", { className: iframeClassImp, title: videoTitle, width: width, height: height, frameBorder: "0", allow: "encrypted-media; picture-in-picture", allowFullScreen: true, src: iframeSrc })));
}

export { LiteYouTubeEmbed as default };
//# sourceMappingURL=index.es.jsx.map
