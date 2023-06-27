const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (userId:string) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userId: userId,
            };
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {  
                expiresIn: '8h',
                issuer: 'amardeepranjan911@gmail.com',
                audience: userId,
            };
            JWT.sign(payload, secret, options, (err:any, token:string) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken: (req:any, res:any, next:any) => {
        if(!req.headers['authorization']) return next(createError.Unauthorized());
        console.log(req.headers['authorization'])
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err:any, payload:any) => {
            if (err) {
                const message =
                err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return next(createError.Unauthorized(message));
            }
            req.payload = payload;
            next();
        }
        );
    }
    }
