import './App.css';
import Clock from './modules/clock';
import DateTime from './modules/date';
import CurrentWeather from './modules/weather/currentWeather';
import ForecastWeather from './modules/weather/forecastWeather';

function App() {
  return (
    <html>
    <head>
    <title>SmartMirror</title>
    <meta name="google" content="notranslate" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="mobile-web-app-capable" content="yes" />

    <script type="text/javascript">
      window.mmVersion = "#VERSION#";
    </script>
  </head>
  <body>
    <div class="region fullscreen below"><div class="container"></div></div>
    <div class="region top bar">
      <div class="container"></div>
      <div class="region top left"><Clock/><DateTime/></div>
      <div class="region top center"><div class="container"></div></div>
      <div class="region top right"><CurrentWeather/><ForecastWeather/></div>
    </div>
    <div class="region upper third"><div class="container"></div></div>
    <div class="region middle center"><div class="container"></div></div>
    <div class="region lower third">
      <div class="container"><br /></div>
    </div>
    <div class="region bottom bar">
      <div class="container"></div>
      <div class="region bottom left"><div class="container"></div></div>
      <div class="region bottom center"><div class="container"></div></div>
      <div class="region bottom right"><div class="container"></div></div>
    </div>
    <div class="region fullscreen above"><div class="container"></div></div>
    <script type="text/javascript" src="socket.io/socket.io.js"></script>
    <script type="text/javascript" src="vendor/node_modules/nunjucks/browser/nunjucks.min.js"></script>
    <script type="text/javascript" src="js/defaults.js"></script>
    <script type="text/javascript" src="#CONFIG_FILE#"></script>
    <script type="text/javascript" src="vendor/vendor.js"></script>
    <script type="text/javascript" src="modules/default/defaultmodules.js"></script>
    <script type="text/javascript" src="js/logger.js"></script>
    <script type="text/javascript" src="translations/translations.js"></script>
    <script type="text/javascript" src="js/translator.js"></script>
    <script type="text/javascript" src="js/class.js"></script>
    <script type="text/javascript" src="js/module.js"></script>
    <script type="text/javascript" src="js/loader.js"></script>
    <script type="text/javascript" src="js/socketclient.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
  </body>
</html>
  );
}

export default App;
