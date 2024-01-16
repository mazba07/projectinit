var sequelize = require("./dbConfig");

var executeQuery = async function (myQuery = "") {
  const [results, metadata] = await sequelize.query(myQuery);

  if (results === undefined || results.length == 0) {
    return false;
  } else {
    return results;
  }
};

// var insert = async function (tableName = "", record = {}) {
//   const results = await tableName.create(record);
//   return results;
// };

// var update = function (tableName = '', record = {}, options = {}) {
//     return new Promise(function (resolve, reject) {
//         var myQuery = sql.$update({
//             $table: tableName,
//             $set: record,
//             $where: options
//         });
//         pool.query(myQuery, function (error, results, fields) {
//             if (error) {
//                 throw error;
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// };

// var getAllByOptions = function (tableName = '', options = {}) {
//     return new Promise(function (resolve, reject) {
//         var myQuery = sql.$select({
//             '*': true,
//             $from: tableName,
//             $where: options
//         });

//         pool.query(myQuery, function (error, results, fields) {
//             if (error) {
//                 throw error;
//             } else {
//                 if (results === undefined || results.length == 0) {
//                     resolve(false);
//                 } else {
//                     resolve(results);
//                 }
//             }
//         });
//     });
// };

// var totalRow = function (tableName = '') {
//     return new Promise(function (resolve, reject) {
//         var myQuery = "SELECT COUNT(*) as total_row FROM " + tableName;
//         pool.query(myQuery, function (error, results, fields) {
//             if (error) {
//                 throw error;
//             } else {
//                 if (results === undefined || results.length == 0) {
//                     resolve(false);
//                 } else {
//                     resolve(results[0].total_row);
//                 }
//             }
//         });
//     });
// };

module.exports = {
  executeQuery,
  // insert,
  // update,
  // getAllByOptions,
  // totalRow
};
