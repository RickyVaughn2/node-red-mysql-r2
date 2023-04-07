module.exports = function (RED) {
    "use strict";
    const mysql = require('mysql');

    function MySQLR2Node(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var pool;

        function updateStatus() {
            if (config.pooling && pool) {
                node.status({ fill: "grey", shape: "dot", text: "pooling" });
            } else {
                node.status({ fill: "grey", shape: "dot", text: "disconnected" });
            }
        }

        updateStatus();

        node.on('input', function (msg) {
            var host = msg.host || config.host;
            var database = msg.database || config.database;
            var username = msg.username || config.username;
            var password = msg.password || config.password;
            var sql = msg.sql || config.sql;

            if (config.pooling && msg.hasOwnProperty('host')) {
                pool = mysql.createPool({
                    host: host,
                    user: username,
                    password: password,
                    database: database,
                    waitForConnections: config.waitForConnections,
                    connectionLimit: config.connectionLimit,
                    queueTimeout: config.queueTimeout
                });
            }

            var getConnection = config.pooling ? pool.getConnection.bind(pool) : (callback) => {
                var connection = mysql.createConnection({
                    host: host,
                    user: username,
                    password: password,
                    database: database
                });
                callback(null, connection);
            };

            node.status({ fill: "yellow", shape: "ring", text: "connecting" });

            getConnection(function (err, connection) {
                if (err) {
                    node.error(err, msg);
                    node.status({ fill: "red", shape: "dot", text: "error" });
                    if (!config.pooling) connection.end();
                    return;
                }

                node.status({ fill: "green", shape: "dot", text: "connected" });

                connection.query(sql, function (err, rows) {
                    if (err) {
                        node.error(err, msg);
                        node.status({ fill: "red", shape: "dot", text: "error" });
                    } else {
                        msg.payload = rows;
                        node.send(msg);
                        updateStatus();
                    }
                    if (config.pooling) {
                        connection.release();
                    } else {
                        connection.end();
                    }
                });
            });
        });
    }

    RED.nodes.registerType("mysql-r2", MySQLR2Node);
}
