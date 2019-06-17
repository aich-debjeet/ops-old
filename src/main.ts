import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

function appendScript(content: any) {
  const script = document.createElement('script');
  script.innerHTML = content;
  document.head.appendChild(script);
}

if (environment.production) {

  // Google Analytics Tracking Code
  appendScript(`(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create','UA-111245284-1','auto');`);
  // console.log('Google Analytics Enabled');

  // Hotjar Tracking Code for https://onepagespotlight.com/
  appendScript(`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:1178695,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`);
  // console.log('Hotjar Tracking Enabled');

  // Google Tag Manager
  appendScript(`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PZ3326W');`);
  // console.log('Google Tag Manager Enabled');

  // Google Tag Manager (noscript)
  document.body.insertAdjacentHTML('beforeend', '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PZ3326W" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>');

  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
