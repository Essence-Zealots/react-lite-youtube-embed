import * as React from "react";

export type imgResolution =
  | "default"
  | "mqdefault"
  | "hqdefault"
  | "sddefault"
  | "maxresdefault";

interface LiteYouTube {
  announce?: string;
  id: string;
  title: string;
  activatedClass?: string;
  adNetwork?: boolean;
  aspectHeight?: number;
  aspectWidth?: number;
  iframeClass?: string;
  noCookie?: boolean;
  cookie?: boolean;
  params?: string;
  playerClass?: string;
  playlist?: boolean;
  playlistCoverId?: string;
  poster?: imgResolution;
  webp?: boolean;
  wrapperClass?: string;
  onIframeAdded?: () => void
  muted?: boolean,
  thumbnail?: string,
  height?: number|string,
  width?: number|string,
}

export default function LiteYouTubeEmbed(props: LiteYouTube) {
  const [preconnected] = React.useState(false);
  const [iframe] = React.useState(false);
  const videoId = encodeURIComponent(props.id);
  const videoPlaylisCovertId = typeof props.playlistCoverId === 'string' ? encodeURIComponent(props.playlistCoverId) : null;
  const videoTitle = props.title;
  const posterImp = props.poster || "hqdefault";
  const paramsImp = `&${props.params}` || "";
  const mutedImp = props.muted ? "&mute=1" : "";
  const format = props.webp ? 'webp' : 'jpg';
  const vi = props.webp ? 'vi_webp' : 'vi'
  const posterUrl = props.thumbnail || (!props.playlist 
    ? `https://i.ytimg.com/${vi}/${videoId}/${posterImp}.${format}` 
    : `https://i.ytimg.com/${vi}/${videoPlaylisCovertId}/${posterImp}.${format}`);

  let ytUrl = props.noCookie
    ? "https://www.youtube-nocookie.com"
    : "https://www.youtube.com";
  ytUrl = props.cookie
    ? "https://www.youtube.com"
    : "https://www.youtube-nocookie.com";

  const iframeSrc = !props.playlist
    ? `${ytUrl}/embed/${videoId}?autoplay=1&state=1${mutedImp}${paramsImp}`
    : `${ytUrl}/embed/videoseries?autoplay=1${mutedImp}&list=${videoId}${paramsImp}`;

  const adNetworkImp = props.adNetwork || false;
  const iframeClassImp = props.iframeClass || "";
  const onIframeAdded = props.onIframeAdded || function () { };
  const height = props.height || "560";
  const width = props.width || "315";

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
  React.useEffect(() => {
    if (iframe) {
      onIframeAdded();
    }
  }, [iframe]);

  return (
    <>
      <link
        rel="preload"
        href={posterUrl}
        as="image"
      />
      <>
        {preconnected && (
          <>
            <link rel="preconnect" href={ytUrl} />
            <link rel="preconnect" href="https://www.google.com" />
            {adNetworkImp && (
              <>
                <link rel="preconnect" href="https://static.doubleclick.net" />
                <link
                  rel="preconnect"
                  href="https://googleads.g.doubleclick.net"
                />
              </>
            )}
          </>
        )}
      </>
      <iframe
        className={iframeClassImp}
        title={videoTitle}
        width={width}
        height={height}
        frameBorder="0"
        allow="encrypted-media; picture-in-picture"
        allowFullScreen
        src={iframeSrc}
      ></iframe>
    </>
  );
}

