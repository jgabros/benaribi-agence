import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? '';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? '';

export function AnalyticsProvider() {
  return (
    <>
      {GA4_ID && <GoogleAnalytics gaId={GA4_ID} />}

      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${META_PIXEL_ID}');fbq('track','PageView');
          `}
        </Script>
      )}

      {LINKEDIN_PARTNER_ID && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id="${LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];
            var b=document.createElement("script");b.type="text/javascript";b.async=!0;
            b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b,s)})(window.lintrk);
          `}
        </Script>
      )}
    </>
  );
}
