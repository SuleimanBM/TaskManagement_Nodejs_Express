export const filters = (req, res, next) => {
    const { status, priority, category, sort } = req.query

    const filters = {}

    if(status) filters.status = status;
    if(priority) filters.priority = priority;
    if(category) filters.category = category;
    if(sort) filters.sort = sort;

    req.filters = filters;

    next(); // Proceed to the next middleware or route handler
};
