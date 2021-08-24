'use strict'

const RequestData = require( './request' )
const http = require( 'http' );

http
    .createServer( ( request, response ) => {
        const reqBody = new RequestData( request );

        routerReq( reqBody ).then(
            res => {
                response.end( res );
            },
            err => {
                response.end( `<p style='font-size: 25px; text-align: center; margin-top: 100px;'>NOT FOUND<\p>` );
            }
        );
    } )
    .listen( 3000, '127.0.0.1', () => {
        console.log( 'listen on port 3000' )
    } );

async function routerReq( reqBody ) {
    let answer = null;
    if ( reqBody.data ) {
        answer = await sendQuery( reqBody.data );
    }
    return answer;
}

function sendQuery( keyData ) {
    const knex = module.exports.knex;
    const param = {
        address: 's_test.t_test',
        targetData: keyData.test,
    };

    return knex.select( param ).then( ( res ) => {
        return JSON.stringify( res );
    } );
}
