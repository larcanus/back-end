const http = require( 'http' );
const knex = require( 'knex' )( {
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '100',
        database: 'db_test'
    },
    debug: true,
} );
const queryBuilder = require( './queryBilder' );
const query = new queryBuilder( knex );


http
    .createServer( ( request, response ) => {
        console.log( `Запрошенный адрес: ${ request.url }` );
        // получаем путь после слеша
        const requestURL = request.url.substr( 1 );
        let data = `<b>No data</b>`;

        if ( requestURL.includes( 'start_test' ) ) {

            getTests( requestURL ).then( ( res ) => {
                console.log( 'data result test ---->', res );
                response.end( `<p>${ res }</p>` );
            } );

        } else if ( requestURL.includes( `login` ) ) {

            if ( request?.body ) {                                    //TODO если будет использоваться fecth. А ответ в каком формате?
                getUser( requestURL.body ).then( ( res ) => {
                    console.log( 'data result login ---->', res );

                    if ( res.length > 0 ) {
                        response.end( `<p>Hello  ${ res[ 0 ]?.name }</p>` );
                    } else {
                        response.statusMessage = 'Not found';
                        response.end( `<p>${ data }</p>` );
                    }

                } );
            }

        } else {
            response.end( data );
        }

    } )
    .listen( 3000, '127.0.0.1', () => {
        console.log( 'Сервер начал прослушивание запросов на порту 3000' )
    } );

/**
 * Метод получения тестов из бд
 * @param {String} requestURL - url адрес запроса
 * @return {Promise}
 */
const getTests = ( requestURL ) => {

    // тут разбираем запрос, какой тест
    // и формируем запрос к бд
    const param = { address: 's_test.t_test' };

    if ( requestURL.includes( 'js' ) ) {
        param.targetData = 'js_test';
    } else if ( requestURL.includes( 'css' ) ) {
        param.targetData = 'css_test';
    } else if ( requestURL.includes( 'php' ) ) {
        param.targetData = 'php_test';
    } else if ( requestURL.includes( 'html' ) ) {
        param.targetData = 'html_test';
    } else {
        return null
    }

    return query.select( param );
}

/**
 * Метод получения данных юзера из бд
 * @param {Object} formData
 * @param {String} [formData.login]
 * @param {String} [formData.password]
 * @return {Promise}
 */
const getUser = ( formData ) => {

    const param = {
        address: 's_test.t_user',
        filter: {
            // login: 'mylogin',
            // password: 123,
            login: formData.login,
            password: formData.password,
        },
    };

    return query.select( param );
}

/**
 * Метод обнолвения данных юзера
 * @param {Object} formData
 * @param {String} [formData.login]
 * @param {String} [formData.password]
 * @param {String} [formData.tokenAuth]  ??? нужен ли токен на право изменений или нет, или доступ будет на стороне клиента?
 * @param {Object} [formData.newData]
 * @return {Promise}
 */
const updateUser = ( formData ) => {

    const param = {
        address: 's_test.t_user',
        filter: {
            login: formData.login,
            password: formData.password,
        },
        data: formData.newData,
    };

    return query.update( param );
}

