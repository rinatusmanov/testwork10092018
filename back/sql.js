var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'alseko'
});


function query(query, params, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(null, err);
        }

        connection.query(query, params, function (err, rows) {
            connection.release();
            if (!err) {
                callback(rows);
            }
            else {
                callback(null, err);
            }
        });

        connection.on('error', function (err) {
            connection.release();
            callback(null, err);
        });
    });
};

// exports.pool = pool;
module.exports = query;