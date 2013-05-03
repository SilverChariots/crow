/**
  * Cassandra Connect Test
  */

exports.index = function(req, res) {
//    var System = require('cassandra-client').System;
//    var sys = new System('127.0.0.1:9160');
    var err = '';
    var result = '';

//    sys.describeKeyspace('Keyspace1', function(err, ksDef) {
//        if (err) {
//            // this code path is executed if the key space does not exist.
//            err = 'this code path is executed if the key space does not exist.';
//        } else {
//            // assume ksDef contains a full description of the keyspace (uses the thrift structure).
//            err = 'no error';
//        }
//        err = 'no error';
//    });

    // Creating a new connection pool.
    var PooledConnection = require('cassandra-client').PooledConnection;
    var hosts = ['localhost:9160'];
    var connection_pool = new PooledConnection({'hosts': hosts, 'keyspace': 'Keyspace1'});

    // Reading
    connection_pool.execute('SELECT ? FROM Standard1 WHERE KEY=?', ['A', 'K'],
        function(err, row) {
            if (err) console.log("lookup failed");
            else console.log("got result " + row);
        }
    );    

    // Shutting down a pool
    connection_pool.shutdown(function() { console.log("connection pool shutdown"); });

    res.render('cassandra', { title: 'Cassandra Connect Test', err: err, row: result })
}
