module.exports = function(RED) {
    "use strict";
    const mysql = require('mysql');

    function MySQLR2Node(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var pool = mysql.createPool({
            connectionLimit: parseInt(config.connectionLimit) || 10,
            host: config.host,
            user: config.username,
            password: config.password,
            database: config.database,
            waitForConnections: config.waitForConnections === 'true' ? true : false,
            queueTimeout: parseInt(config.queueTimeout) || 30000 // Timeout after 30 seconds
        });

        node.status({fill:"grey",shape:"dot",text:"disconnected"});

        node.on('input', function(msg) {
            var host = msg.host || config.host;
            var database = msg.database || config.database;
            var username = msg.username || config.username;
            var password = msg.password || config.password;
            var sql = msg.sql || config.sql;

            node.status({fill:"yellow",shape:"ring",text:"connecting"});

            pool.getConnection(function(err, connection) {
                if (err) {
                    node.error(err, msg);
                    node.status({fill:"red",shape:"dot",text:"error"});
                    return;
                }

                node.status({fill:"green",shape:"dot",text:"connected"});

                connection.query(sql, function(err, rows) {
                    connection.release(); // Release the connection back to the pool
                    if (err) {
                        node.error(err, msg);
                        node.status({fill:"red",shape:"dot",text:"error"});
                        return;
                    }

                    msg.payload = rows;
                    node.send(msg);
                    node.status({fill:"green",shape:"ring",text:"idle"});
                });
            });
        });

        node.on('close', function() {
            pool.end(function(err) {
                if (err) {
                    node.error(err);
                }
            });
        });
    }

    RED.nodes.registerType("mysql-r2", MySQLR2Node);
}
