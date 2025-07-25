import 'dotenv/config';

export default {
  secret: process.env.AUTH_SECRET,
  expiresIn: process.env.AUTH_EXPIRES,
};
