module.exports = function(RED) {
    "use strict";
    const mysql = require('mysql');

    function MySQLR2Node(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.status({fill:"grey",shape:"dot",text:"disconnected"});

        node.on('input', function(msg) {
            var host = msg.host || config.host;
            var database = msg.database || config.database;
            var username = msg.username || config.username;
            var password = msg.password || config.password;
            var sql = msg.sql || config.sql;

            var connection = mysql.createConnection({
                host: host,
                user: username,
                password: password,
                database: database
            });

            node.status({fill:"yellow",shape:"ring",text:"connecting"});

            connection.connect(function(err) {
                if (err) {
                    node.error(err, msg);
                    node.status({fill:"red",shape:"dot",text:"error"});
                    connection.end();
                    return;
                }

                node.status({fill:"green",shape:"dot",text:"connected"});

                connection.query(sql, function(err, rows) {
                    if (err) {
                        node.error(err, msg);
                        node.status({fill:"red",shape:"dot",text:"error"});
                        connection.end();
                        return;
                    }

                    msg.payload = rows;
                    node.send(msg);
                    node.status({fill:"green",shape:"ring",text:"idle"});
                    connection.end();
                });
            });
        });
    }

    RED.nodes.registerType("mysql-r2", MySQLR2Node);
}