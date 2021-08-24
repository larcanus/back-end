'use strict'

/**
 *  Export server.
 */
module.exports = require( './server' );

/**
 *  Export ORM.
 */
const queryBilder = require( './queryBilder' );

module.exports.knex = new queryBilder( require( 'knex' )( {
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '100',
        database: 'db_test'
    },
    debug: true,
} ) );

