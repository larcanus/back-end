'use strict'

console.log( 'queryBilder')

class QueryBilder {

    constructor( config ) {
        this.bilder = config;
    }

    /**
     * Метод получения данных из БД по запросу
     * @param {Object} param
     * @param {String|null} [param.address] адрес таблицы
     * @param {Object|null} [param.filter] фильтер (where)
     * @param {Object|null} [param.targetData] таргет (select)
     * {Promise}
     */
    select( param ) {
        if ( param?.targetData && param?.address && param?.filter ) {
            return this.bilder
                .where( param.filter )
                .select( param.targetData )
                .from( param.address )
                .then( ( res ) => {
                    return res;
                } )
                .catch( ( err ) => {
                    console.warn( 'err query_bilder select--->', err );
                    throw err
                } );
        } else {
            return this.bilder
                .select( param.targetData || '*' )
                .from( param.address || 's_test.t_test' )
                .then( ( res ) => {
                    return res;
                } )
                .catch( ( err ) => {
                    console.warn( 'err query_bilder select--->', err );
                    throw err
                } );
        }
    }

    /**
     * Метод обновления данных в БД
     * @param {Object} param
     * @param {String} [param.address] адрес таблицы
     * @param {Object} [param.filter] фильтер (where)
     * @param {Object} [param.data] новые данные { column : new Data }
     * @return {Promise}
     */
    update( param ) {
        if ( param?.filter && param?.address && param?.data ) {
            return this.bilder( param.address )
                .where( param.filter )
                .update( param.data )
                .then( ( res ) => {
                    return res;
                } )
                .catch( ( err ) => {
                    console.warn( 'err query_bilder update--->', err );
                    throw err
                } );
        }
    }
}

module.exports = QueryBilder