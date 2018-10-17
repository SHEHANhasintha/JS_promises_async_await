/*
const waitFor = (ms) => new Promise((r) => setTimeout(r, ms))
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const start = async () => {
  await asyncForEach([1, 2, 3], async (num) => {
    await waitFor(5000)
    console.log(num)
  })
  console.log('Done')
}

start()
*/

const fs = require('fs')
const path = require('path');
const data = {}
data._baseDir = path.join(__dirname,'/../promises/')
//console.log(data._baseDir+'ok.json')
//read from a file
data.read =  function(callback){
  return new Promise((resolve,reject) => {
     fs.readFile(data._baseDir+'ok.json','utf8', function(err,readData){
      if (!err){
        resolve(
          data.read2(function(err,readData){
              callback(err)
         })
     )
      }else{
        reject(
         console.log({'error' : 'file opening error'})
       )
      }
    })
  })
}

data.read2 =  function(callback){
  return new Promise((resolve,reject) => {
     fs.readFile(data._baseDir+'ck.json','utf8', function(err,readData){
      if (!err){
         resolve(callback(false,readData));
      }else{
         reject(callback({'error' : 'file opening error'}))
      }
    })
  })
}

data.consoler = function(){
  console.log('here')
}

data.tryNow = async function(){
  for (let i=0; i<3; i++){
    await data.read(function(err){
      console.log(err)
    })
    console.log(i)
  }
  data.consoler()
}

data.tryNow()
/*  if (!err){
    callback(false,readData);
  }else{
    callback({'error' : 'file opening error'})
  }


*/
