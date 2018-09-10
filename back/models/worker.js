var query = require('../sql');
console.log("Worker")

function Worker() {
    if (!(this instanceof Worker)) {
        return new Worker()
    }
}
Worker.prototype.New = function (surname, name, patronymic, items, length, itogo, callback) {
    query("INSERT INTO `worker` (`id`, `surname`, `name`, `patronymic`, `items`, `length`, `itogo`) VALUES (NULL,?, ?, ?, ?, ?, ?)", [
        surname, name, patronymic, items, length, itogo
    ], (result, err) => {
        callback(result, err)
    })
}

Worker.prototype.Update = function (surname, name, patronymic, items, length, itogo, id, callback) {
    query("UPDATE `worker` SET `surname` = ?, `name` = ?, `patronymic` = ?, `items` = ?, `length` = ?, `itogo` = ? WHERE `worker`.`id` = ?", [
        surname, name, patronymic, items, length, itogo, id
    ], (result, err) => {
        callback(result, err)
    })
}

Worker.prototype.Select = function (callback) {
    query("SELECT * FROM `worker`", [], (result, err) => {
        callback(result, err)
    })
}

Worker.prototype.Get = function (id,callback) {
    query("SELECT * FROM `worker` WHERE `worker`.`id` = ?", [id], (result, err) => {
        callback(result, err)
    })
}

Worker.prototype.Delete = function (id, callback) {
    query("DELETE FROM `worker` WHERE `worker`.`id` = ?", [
        id
    ], (result, err) => {
        callback(result, err)
    })
}

module.exports = Worker