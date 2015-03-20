Package.describe({
  name: 'mstn:method-watcher',
  summary: '',
  version: '0.0.1',
  git: 'https://github.com/mstn/method-watcher.git'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0.3');

  api.addFiles('server/api.js');
  api.addFiles('server/watcher.js', 'server');
  
  api.use(['underscore']);

  api.export('MethodWatcher');
});
