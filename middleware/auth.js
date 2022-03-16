import jwt from 'jsonwebtoken';

export const auth = (request, response, next) => {
    const token = request.header("pizzeria-auth-token");
    try {
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch(error) {
        response.status(400).send({message : error.message});
    }
    
}