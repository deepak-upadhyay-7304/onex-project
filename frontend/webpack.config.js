const path = require('path');

module.exports = {
  resolve: {
    alias: {
      "@dashboard": path.resolve(__dirname, "../dashboard/src/components")
    }
  }
};
