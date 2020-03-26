const express = require("express")
const sql = require("mysql2")
var async = require('async');
const dashboardRA = express.Router()
const cors = require('cors')
dashboardRA.use(cors())

var genTagNum = require('../tagNumber')
//const db = require("../database/invest-ed_db")

const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'PASSWORD66^',
    database: 'inves431_girlsEd',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
})

//GET from from DB
dashboardRA.get('/form/:tagNum', cors(),(req, res) =>{

    var tagNum = req.params.tagNum
    
    //initiative queries
    var query1 = "SELECT * FROM initiative WHERE tagNumber =" + tagNum
    var query2 = "SELECT * FROM initiativeregion WHERE tagNumber =" + tagNum
    var query3 = "SELECT * FROM initiativecountryofoperation WHERE tagNumber =" + tagNum
    var query4 = "SELECT * FROM initiativeprogrammingactivities WHERE tagNumber =" + tagNum
    var query5 = "SELECT * FROM initiativefundingsource WHERE tagNumber =" + tagNum
    var query6 = "SELECT * FROM initiativelaunchcountry WHERE tagNumber =" + tagNum
    var query7 = "SELECT * FROM initiativetargetgeography WHERE tagNumber =" + tagNum
    var query8 = "SELECT * FROM initiativetargetpopulationsector WHERE tagNumber =" + tagNum
    var query9 = "SELECT * FROM initiativemonitoredoutcomes WHERE tagNumber =" + tagNum
    var query10 = "SELECT * FROM initiativemaineducationsubsector WHERE tagNumber =" + tagNum
    var query11 = "SELECT * FROM initiativeeducationsubsector WHERE initiativeTagNumber =" + tagNum
    var query11 = "SELECT * FROM initiativetargetschoolmanagement WHERE tagNumber =" + tagNum

     //implementor queries
     var query12 = "SELECT * FROM implements INNER JOIN implementor USING (implementorName) WHERE tagNum =" + tagNum

    //funder queries
    var query13 = "SELECT * FROM funds INNER JOIN funder USING (funderName) WHERE tagNum =" + tagNum


    var formData = {}


    async.parallel([
        function(queryDB) {
            pool.query(query1, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table1 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query2, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table2 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table3 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table4 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query5, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table5 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query6, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table6 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query7, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table7 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query8, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table8 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query9, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table9 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query10, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table10 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query11, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table11 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query12, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table12 = results;
                    queryDB()
                } 
                
            })
        },
        function(queryDB) {
            pool.query(query13, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    formData.table13 = results;
                    queryDB()
                } 
                
            })
        },
    
     ], function(err) {
          if (err){
            console.log(err)
          }else{
            //pool.end()
            res.send(formData)
          } 
          
     })

})


//GET form from temp DB
dashboardRA.get('/form-temp', (req, res) =>{
    //res.send("hello!")
})

//POST new form to temp DB
dashboardRA.post('/new-form-temp', (req, res) =>{
    //res.send("hello!")
})

//POST modified form to temp DB
dashboardRA.post('/modified-form-temp', (req, res) =>{
    //res.send("hello!")
})

//POST new form to DB
dashboardRA.post('/new-form', (req, res) =>{
    
    const formData = {
        // single val funder
        funderName: req.body.fname, //f
        funderUrl: req.body.furl, //f
        funderMotive: req.body.motive, //f
        funderImpact: req.body.impact, //f
        funderOrganizationForm: req.body.organizationForm, //f
        // multi val funder
        funderInternationalBases: req.body.internationalBases, //f
        funderEducationSubsector: req.body.edSubs, //f
        funderOrgTraits: req.body.orgTraits, //f
        funderAsiaBases: req.body.asialBases, //f
        funderAsiaOperations: req.body.asiaOperations, //f
        // single val initiative
        initiativeName: req.body.initName, //in
        initiativeURL: req.body.initURL, //in
        initiativeTargetsWomen: req.body.tWomen, //in
        initiativeStart: req.body.initStart, //in
        initiativeEnd: req.body.initEnd, //in
        initiativeDescription: req.body.idescription, //in
        initiativeProgramAreas: req.body.programArea, //in
        initiativeMainProgramActivity: req.body.initativeMainProgramActivity, //in
        initiativeFeeAccess: req.body.feeAccess, //in
        // multi val initiative
        initiativeRegions: req.body.regions, //in
        initiativeCountries: req.body.countries, //in
        initiativeActivities: req.body.activities, //in
        initiativeSourceOfFees: req.body.sourceOfFees, //in
        initiativeLaunchCountry: req.body.launchCountry, //in
        initiativeTargetGeo: req.body.targetGeos, //in
        initiativetargetPopulationSector: req.body.targetPopulationSectors, //in
        initiativeOutcomesMonitored: req.body.outcomesMonitored, //in
        initiativeMEdSubs: req.body.mEdSubs, //in
        initiativeOEdSubs: req.body.oEdSubs, //in
        initiativeManagementTypes: req.body.managementTypes, //in
        // single val implementer
        implementorName: req.body.iname, //im
        implementorMotive: req.body.impMotive, //im
        // single val other
        comments: req.body.comments, //other
        needsReview: req.body.needsReview //other
    }


   //Insert funder data
   var query1 = "INSERT into funder VALUES ('" + formData.funderName +"','"+ formData.funderUrl +"','"+ formData.funderMotive +"','"+ formData.funderImpact +"','"+ formData.funderOrganizationForm +"')"
   async.parallel([
    function(queryDB) {
        pool.query(query1, {}, function(err, results) {
            if (err){
                return queryDB(err)
            }else{
                //formData.table1 = results;
                queryDB()
            } 
            
        })
    },

    ], function(err) {
        if (err){
            console.log(err)
        }

    })
   
   
   //Insert funder international bases data
   for(var i = 0; i <formData.funderInternationalBases.length; i++) {
        var query2 = "INSERT into funderinternationalbases VALUES ('" + formData.funderName +"','"+ formData.funderInternationalBases[i] +"')"
        //console.log(query2)
        async.parallel([
            function(queryDB) {
                pool.query(query2, {}, function(err, results) {
                    if (err){
                        return queryDB(err)
                    }else{
                        //formData.table1 = results;
                        queryDB()
                    } 
                    
                })
            },

        ], function(err) {
            if (err){
                console.log(err)
            }
        
    })
    }
   
    //Insert funder education subsector data
  for(var i = 0; i <formData.funderEducationSubsector.length; i++) {
    var query3 = "INSERT into fundereducationsubsectors VALUES ('" + formData.funderName +"','"+ formData.funderEducationSubsector[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query3, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
   
    //Insert funder education organizational traits data
   for(var i = 0; i <formData.funderOrgTraits.length; i++) {
    var query4 = "INSERT into funderorganizationtraits VALUES ('" + formData.funderName +"','"+ formData.funderOrgTraits[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query4, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }

    //Insert funder education funder asia bases data
   for(var i = 0; i <formData.funderAsiaBases.length; i++) {
    var query5 = "INSERT into funderasiabases VALUES ('" + formData.funderName +"','"+ formData.funderAsiaBases[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query5, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
    
    //Insert funder education funder asia operations data
   for(var i = 0; i < formData.funderAsiaOperations.length; i++) {
    var query6 = "INSERT into funderasiaoperations VALUES ('" + formData.funderName +"','"+ formData.funderAsiaOperations[i]+"')"
    async.parallel([
        function(queryDB) {
            pool.query(query6, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },

    ], function(err) {
        if (err){
            console.log(err)
        }
    
    })
    }
   
    res.send("success")

    //Insert initative data
    query7 = "INSERT into initiative VALUES ("+ genTagNum.currentTagNum +",'"+ formData.initiativeName +"','"+ formData.initiativeURL +"','"+ formData.initiativeTargetsWomen +
     "','"+ formData.initiativeStart +"','"+ formData.initiativeEnd +"','"+ formData.initiativeDescription +"','"+ formData.initiativeProgramAreas+"','"
     + formData.initiativeMainProgramActivity +"','"+ formData.initiativeFeeAccess+"')"
     async.parallel([
        function(queryDB) {
            pool.query(query7, {}, function(err, results) {
                if (err){
                    return queryDB(err)
                }else{
                    //formData.table1 = results;
                    queryDB()
                } 
                
            })
        },
    
        ], function(err) {
            if (err){
                console.log(err)
            }
    
        })
    

    var query8 = "INSERT into funderasiaoperations VALUES (" + genTagNum.currentTagNum +",'"+ formData.funderAsiaOperations+"')"
    var query9 = "INSERT into funderasiaoperations VALUES (" + genTagNum.currentTagNum +",'"+ formData.funderAsiaOperations+"')"
    var query10 = "INSERT into funderasiaoperations VALUES (" + genTagNum.currentTagNum +",'"+ formData.funderAsiaOperations+"')"
    var query11= "INSERT into funderasiaoperations VALUES (" + genTagNum.currentTagNum +",'"+ formData.funderAsiaOperations+"')"
    var query12 =  "INSERT into funderasiaoperations VALUES (" + genTagNum.currentTagNum +",'"+ formData.funderAsiaOperations+"')"
    var query13 = "INSERT into funderasiaoperations VALUES (" + genTagNum.currentTagNum +",'"+ formData.funderAsiaOperations+"')"
    var query14 = "INSERT into funderasiaoperations VALUES (" + genTagNum.currentTagNum +",'"+ formData.funderAsiaOperations+"')"
    var query15 = "INSERT into funderasiaoperations VALUES (" + genTagNum.currentTagNum +",'"+ formData.funderAsiaOperations+"')"
    var query16= "INSERT into funderasiaoperations VALUES (" + genTagNum.currentTagNum +",'"+ formData.funderAsiaOperations+"')"
    var query17 = "INSERT into funderasiaoperations VALUES (" + genTagNum.currentTagNum +",'"+ formData.funderAsiaOperations+"')"
    var query18 = "INSERT into funderasiaoperations VALUES (" + genTagNum.currentTagNum +",'"+ formData.funderAsiaOperations+"')"

    //implementor queries

   //funder queries
  
   //AT THE VERY END
   genTagNum.add()

})

//Post modified form to DB
dashboardRA.post('/modified-form', (req, res) =>{
    //res.send("hello!")
})



module.exports = dashboardRA