function paginatedResults(model, req) {
  const results = {};
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if(!page || !limit){
    results.results = model;
    return results;
  }
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  if (startIndex > 0) {
      results.previous = {
          page: page - 1,
          limit: limit
      }
  }
  if (endIndex < model.length) {
      results.next = {
          page: page + 1,
          limit: limit
      }
  }
  results.results = model.slice(startIndex, endIndex);
  return results;
}

module.exports = {
  paginatedResults
}