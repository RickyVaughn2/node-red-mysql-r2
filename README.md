# mysql-r2

The `mysql-r2` Node-RED node allows you to execute SQL queries against a MySQL database. It accepts the host, database name, username, password, and SQL query as inputs, and outputs the query result set.  The node will disconnect from the database between messages.

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

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
