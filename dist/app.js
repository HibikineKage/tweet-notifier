'use strict';

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _tokens = require('./tokens');

var _tokens2 = _interopRequireDefault(_tokens);

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var twitter = new _twitter2.default(_tokens2.default);

var keywords = ['絵チャ', 'えちゃ', 'お絵かきチャットなう', '#MagicalDraw'];
var keyword_urls = ['draw.kuku.lu', 'www.takamin.com'];

var stream = twitter.stream('user', { with: true }, function (stream) {
  stream.on('data', function (event) {
    if (event.text != null) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keywords[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var keyword = _step.value;

          // キーワードを含むかどうか
          if (~event.text.indexOf(keyword)) {
            _nodeNotifier2.default.notify({
              title: keyword + ' - tweet-notifier',
              message: event.text
            });
            console.log('notified.');
            return;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = event.entities.urls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var expanded_url = _step2.value.expanded_url;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = keyword_urls[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var url = _step3.value;

            // URLを含むかどうか
            if (~expanded_url.indexOf(url)) {
              _nodeNotifier2.default.notify({
                title: url + ' - tweet-notifier',
                message: event.text
              });
              console.log('notified.');
              return;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
  stream.on('error', function (error) {
    throw error;
  });
});