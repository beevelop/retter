'use strict'

const fs = require('fs-promise')
const path = require('path')
const util = require('util')
const getStdin = require('get-stdin')
const reverseMustache = require('reverse-mustache')

const templateFile = path.resolve(process.argv[2])
const contentFile = process.argv[3] ? path.resolve(process.argv[3]) : null

let content = ''
fs.stat(templateFile).catch(function (err) {
  console.error('Invalid template file path. File could not be found!\n')
  console.error(util.inspect(err, {depth: null, colors: true}))
  process.exit(1)
}).then(function () {
  if (contentFile) {
    return fs.readFile(contentFile, {encoding: 'utf-8'})
  }

  return getStdin()
}).then(cnt => {
  if (!cnt) {
    console.error('Empty content is not valid!')
    process.exit(1)
  }
  content = cnt
  return fs.readFile(templateFile, {encoding: 'utf-8'})
}).then(template => {
  return reverseMustache({
    template: template,
    content: content
  })
}).then(res => {
  console.log(util.inspect(res, {depth: null, colors: true}))
}).catch(err => {
  console.error(err)
})





 

