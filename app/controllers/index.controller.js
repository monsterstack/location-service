'use-scrict';

const index = (app) => {
  return (req, res) => {
    res.render('index', {});
  };
};

exports.index = index;
