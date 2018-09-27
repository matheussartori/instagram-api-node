# Instagram API

This is a "copy" from Instagram API based on their documentation for developers.
The API doesn't have all the routes, only the ones i needed.

Made only for educational purposes.

To install the dependencies, please run:

```
npm install
```

Don't forget to install MongoDB and create the DB `instagram_api`. You can create your own DB, but you'll have to change on config/custom-express.js on let dev_db_url.

You'll have to change the callback url to. Look into users.common.js inside controllers, and change const callback_url to the choosen one.
