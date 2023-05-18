import mongoose from './mongoose.config';
import storage from './storage.config';
import graphql from './graphql.config';
import jwt from './jwt.config';
import googleOauth from './google.oauth.config';

export default [mongoose, storage, graphql, jwt, googleOauth];
