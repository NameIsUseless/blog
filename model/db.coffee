mong = require 'mongoose'

db_uri = 'mongodb://localhost/blog'

db = mong.connection

db.on 'error', (err) ->
    console.log "Mongoose connection error: #{err}"

db.on 'connnected', () ->
    console.log 'Mongoose connected'

db.on 'disconnnected', () ->
    console.log 'Mongoose disconnected'


process.on 'SIGINT', () ->
    mong.connection.close () ->
        console.log 'Mongoose disconnected through app termination'
        process.exit(0)

mong.connect db_uri

Schema = mong.Schema

postSchema = new Schema {
    title: String
    summary: String
    body: String
    bodySource: String
    createDate: {
        type: Date
        default: Date.now
    }
    editDate: {
        type: Date
        default: Date.now
    }
    tags: {
        type: [String]
        default: []
    }
    ###
    type: 'article'|'page'
    ###
    type:  {
        type: String
        default: 'article'
    }
}

mong.model 'Post', postSchema

module.exports.findById = (model_name, id, callback) ->
    (mong.model model_name).findOne {_id: id}, callback

module.exports.add = (model_name, data, callback) ->
    (mong.model model_name).create data, callback

module.exports.find = (model_name, condi, callback) ->
    (mong.model model_name).find condi

module.exports.update = (model_name, condi, data, callback) ->
    (mong.model model_name).update condi, data, callback

module.exports.rm = (model_name, condi, callback) ->
    (mong.model model_name).remove condi, callback
