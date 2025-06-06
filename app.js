
const mysql2=require('mysql2')


const dbconnection=mysql2.createpool({
    user:"Evangadi-admin",
    database:"evangadi-db",
    host:"localhost",
    password:"Evangadi123456$$",
    connectionLimit:10
})

// async function start(){
//     try {
//         const result=await dbconnection.excute("select 'test'")
//     } catch (error) {
//         console.log(error.message);
        
//     }
// }
dbconnection.execute ("select 'test' ", (err,result)=>{
    if(err){
        console.log(err.message);
        
    } else{
        console.log(result);
        
    }
})


