# mysql-r2

The `mysql-r2` Node-RED node allows you to execute SQL queries against a MySQL database. It accepts the host, database name, username, password, and SQL query as inputs, and outputs the query result set. The node can also be configured to use connection pooling to manage multiple connections to the database.

## Prerequisites

- Node-RED installed on your system
- A MySQL database instance

## Installation

You can install the `mysql-r2` node from within Node-RED, or via the npm package manager:

npm install node-red-contrib-mysql-r2

## Usage

1. Drag the `mysql-r2` node from the Node-RED palette to your flow.
2. Double-click on the node to open its configuration panel.
3. Enter the database name, username, password, and SQL query in the configuration panel.
4. Click "Done" to save the node configuration.
5. Deploy your flow.

## Node Configuration

- **Name** (optional): A name for the node.
- **Host** (optional): The host name or IP address of the MySQL database.
- **Database** (optional): The name of the database to execute the query against.
- **Username** (optional): The username to use when connecting to the database.
- **Password** (optional): The password to use when connecting to the database.
- **SQL** (optional): The SQL query to execute.
- **Connection Pooling** (optional): Enable or disable connection pooling.
- **Wait for Connections** (optional): Determines whether the pool should wait for a connection to be available when there are no more available connections.
- **Connection Limit** (optional): The maximum number of connections to create at once.
- **Queue Timeout** (optional): The maximum number of milliseconds to wait before timing out when waiting for a connection to become available.


You can also use messages to pass in the configuration values. The node will use the message values if they are present, otherwise it will use the values set in the configuration panel.

## Input

- **msg.sql**: The SQL query to execute.
- **msg.database**: The name of the database to execute the query against (optional, overrides the value set in the node configuration).
- **msg.username**: The username to use when connecting to the database (optional, overrides the value set in the node configuration).
- **msg.password**: The password to use when connecting to the database (optional, overrides the value set in the node configuration).
- **msg.host**: The host name or IP address of the MySQL database (optional, overrides the value set in the node configuration).

## Output

- **msg.payload**: The query result set.

## Status

The node status will reflect the status of the MySQL connection:

- **disconnected**: The node has not yet connected to the database.
- **connecting**: The node is currently establishing a connection to the database.
- **connected**: The node has successfully connected to the database.
- **idle**: The node has successfully connected to the database, closed the connection and is waiting for the next message to connect.
- **error**: There was an error connecting to the database or executing the query.



## Example Flow
    [{"id":"27a0a5d0.b8ba64","type":"inject","z":"de780fa5.5b8d5","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"SELECT * FROM users","payloadType":"str","x":220,"y":220,"wires":[["c2f7b05a.4f4a4"]]},{"id":"e2a52467.6cb078","type":"mysql-r2","z":"de780fa5.5b8d5","mydb":"","name":"","host":"localhost","username":"","password":"","sql":"","x":570,"y":220,"wires":[["f81a9a4e.133ef8"]]},{"id":"f81a9a4e.133ef8","type":"debug","z":"de780fa5.5b8d5","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":830,"y":220,"wires":[]},{"id":"c2f7b05a.4f4a4","type":"change","z":"de780fa5.5b8d5","name":"","rules":[{"t":"set","p":"database","pt":"msg","to":"my_database","tot":"str"},{"t":"set","p":"username","pt":"msg","to":"my_username","tot":"str"},{"t":"set","p":"password","pt":"msg","to":"my_password","tot":"str"},{"t":"set","p":"host","pt":"msg","to":"localhost","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":390,"y":220,"wires":[["e2a52467.6cb078"]]}]

This flow consists of an inject node that generates a sample SQL query, a change node that sets the database, username, password, and host information using message properties, a mysql-r2 node that executes the SQL query against the MySQL database using the message properties, and a debug node that outputs the result set to the Node-RED debug pane.

To use this flow, you will need to modify the host, database, username, and password properties of the change node to match your MySQL database configuration.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
