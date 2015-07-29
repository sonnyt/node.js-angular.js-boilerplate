"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
	name: {
		first: String,
		last: String
	},
	email: {
		type: String,
		lowercase: true
	},
	role: {
		type: String,
		default: 'user'
	},
    provider: String,
	hashedPassword: String,
	salt: String,
	created: {
		type: Date,
		default: Date.now
	},
    lastModified: {
        type: Date,
        default: Date.now
    }
});

/**
 * Virtuals
 */

// Password
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();

    this.hashedPassword = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

// Full Name
UserSchema.virtual('name.full').get(function() {
    return this.name.first + ' ' + this.name.last;
});

/**
 * Validate
 */

// Validate empty email
UserSchema.path('email').validate(function(email) {
	return email.length;
}, 'Email cannot be blank');

// Validate empty password
UserSchema.path('hashedPassword').validate(function(hashedPassword) {
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema.path('email').validate(function(value, respond) {
    var self = this;

    this.constructor.findOne({ email: value }, function(err, user) {
        if (err) throw err;

        if (user) {
            if (self.id === user.id) return respond(true);

            return respond(false);
        }

        respond(true);
    });
}, 'The specified email address is already in use.');

/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
    if (!this.isNew) return next();

    if (!!this.hashedPassword) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {String}
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param  {String} password
     * @return {String}
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) return '';

        var salt = new Buffer(this.salt, 'base64');
        
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

module.exports = mongoose.model('User', UserSchema);
