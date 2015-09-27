exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo: "app.js"
    stylesheets:
      joinTo: "app.css"
  plugins:
      babel:
          ignore: [
              /^(bower_components|vendor)/
              'app/legacyES5Code/**/*'
          ]
          pattern: /\.(es6|jsx)$/
      jshint:
        pattern: /^app[\\\/].*\.js$/ # matches any js files under the app/ dir
        options:
          bitwise: true
          curly: true
        globals:
          React: true
        warnOnly: true
