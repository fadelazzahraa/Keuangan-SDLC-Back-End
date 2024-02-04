const limiterOptions = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    skip: (req) => req.path.startsWith('/api-docs'), // Skip rate limiting for Swagger routes
};

exports.module = limiterOptions;