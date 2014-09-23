'use strict';

var _ = require('lodash'),
    $$ = require('../utils/resource-methods')('Post');

// posts#index
exports.index = function (req, res) {
  $$.getResources()
  .then(function (posts) {
    res.json(posts);
  }, function (err) {
    res.send(err);
  });
};

// posts#create
exports.create = function (req, res) {
  $$.createResource(req.body)
  .then(function () {
    return $$.getResources();
  })
  .then(function (posts) {
    res.json(posts);
  })
  .catch(function (err) {
    res.send(err)
  });
};

// posts#show
exports.show = function (req, res) {
  $$.getResource(req.params.id)
  .then(function (post) {
    res.json(post);
  }, function (err) {
    res.send(err);
  });
};

// posts#update
exports.update = function (req, res) {
  $$.getResource(req.params.id)
  .then(function (post) {
    post = _.extend(post, req.body);

    return $$.saveResource(post);
  })
  .then(function (post) {
    res.json(post);
  })
  .catch(function (err) {
    res.send(err);
  });
};

// posts#destroy
exports.destroy = function (req, res) {
  $$.getResource(req.params.id)
  .then(function (post) {
    return $$.removeResource(post);
  })
  .then(function () {
    return $$.getResources();
  })
  .then(function (posts) {
    res.json(posts);
  })
  .catch(function (err) {
    res.send(err);
  });
};
