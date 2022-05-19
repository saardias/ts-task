
export const pagination = async (req, res, next) => {
    console.log('Validating page and limit');
    let page = req.query['page'] || 1;
    let limit = req.query['limit'] || 50;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 50;

    if (page < 1 || limit < 1) {
        console.log(`page or Limit is invalid - page : ${page} limit : ${limit}`);
        res.status(400).send({ error: `page or Limit is invalid - page : ${page} limit : ${limit}` });
        return;
    }
    req.query.page = page;
    req.query.limit = limit;
    next();
}