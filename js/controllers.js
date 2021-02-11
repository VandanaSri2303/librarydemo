angular.module('adminbag')
    
.controller('loginCtrl', function ($http, $scope, $rootScope, $state) {
        $scope.getLoggedIn = function (l) 
        {
            // console.log(l);
            $http.get('http://localhost:7878/nodeapp/getlogData/')
           .success(function (resdata, status) { 
               $scope.login_details= resdata.data[0];
               console.log($scope.login_details)
               if(l.username==$scope.login_details.username && l.password==$scope.login_details.password){
                   $state.go('dashboard');
               }            
               else{
                   alert("Invalid Details..!")
               } 
           })
           .error(function (data, status, headers, config) {
            if (status == 500) { }
            })
        }
    })
    .controller('MainCtrl', function ($http, $scope, $state, $filter, $rootScope) {
                var club_id = localStorage.getItem("club_id");
        ////console.log(club_id);
        if (club_id == null) {
            club_id = 0;
        }
        if (club_id) {
            $rootScope.checkusr = true;
            ////console.log($rootScope.checkusr)
        } else {
            $rootScope.checkusr = false;
            ////console.log($rootScope.checkusr)
        }

        $scope.logout = function () {
            ////console.log("fdfdfsdf");
            localStorage.removeItem('club_id');
            $state.go('login')

        }
    })
    // ******************************************** interior Dashboard start *******************************************  

    //registration start
    .controller('regCtrl', function ($scope, $http, $rootScope, DTOptionsBuilder) {       
               
        //code start
        $scope.registraiondata = function(v)
        {
            console.log(v.v_phno)
               $http.get('http://localhost:7878/nodeapp/checkphData/' + v.v_phno)
               .success(function (resdata, status) {             
                    $scope.phcheck = resdata.data[0].i;
                    console.log($scope.phcheck)
                    if($scope.phcheck==0) 
                  {
                    $http.post('http://localhost:7878/nodeapp/postRegData' , v)
                    .success(function (resdata, status) {             
                    if(resdata.status == 200)
                    {
                      alert('sucess..');
                      $scope.v = {};
                    }else{
                      alert('failed..')
                      $scope.v = {};
                    }
                    })
                   .error(function (data, status, headers, config) {
                   if (status == 500) { }
                    })
                  }
                  else{
                    alert('Existed PhNumber....!');
                   }
                })
                .error(function (data, status, headers, config) {
                if (status == 500) { }
                
               })
            
        }
        
        $scope.getdata =function()
        {
           $http.get('http://localhost:7878/nodeapp/getRegData/')
           .success(function (resdata, status) {             
                $scope.vdata = resdata.data;
                console.log($scope.vdata)
           })
           .error(function (data, status, headers, config) {
            if (status == 500) { }
           })
        }
        $scope.getdata();
        //update data
        $scope.Editvdata = function(d)
        {
            $scope.editdata = d;
            
        }
        $scope.updatevdata = function(editdata)
        {
        $http.post('http://localhost:7878/nodeapp/getEdData', editdata)
        .success(function (resdata, status) {   
        if(resdata.status==200){
            alert("sucessfully updated...")
            $scope.getdata();
        }    
        else{
            alert("failed...")
        }
        })
        .error(function (data, status, headers, config) {
            if (status == 500) { }
        })
        }
        //update end
        //delete start
        $scope.deletevdata = function(id)
        {
          $http.get('http://localhost:7878/nodeapp/deletevendata/' + id)
          .success(function (resdata, status) { 
           if(resdata.status == '200')
           {
             alert('successfully Deleted...!');
             $scope.getdata();                 
           }
           else{
             alert('Failed...!');
           }         
            
        })
          .error(function (data, status, headers, config) {
          if (status == 500) { }
        }) 
       }
      //delete end 
        //code end
        //dt options start
        $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('responsive', true)
        .withDisplayLength(10)

        .withButtons([{
            extend: 'copy'
        },
        {
            extend: 'csv'
        },
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
        ]);
        //dt options end
       
    })
    //registraion end

    //itmes start
    .controller('itemCtrl', function ($scope, $http, $rootScope, DTOptionsBuilder) {   
        
        $scope.itemdata = function(b)
        {
            console.log(b.item);
            $http.get('http://localhost:7878/nodeapp/checkItemData/' + b.item)
            .success(function (resdata, status) { 
                console.log(resdata.data);            
                    $scope.itemscount = resdata.data[0].i;                   
                    if($scope.itemscount==0)
                    {
                        $http.post('http://localhost:7878/nodeapp/postItemData' , b)
                        .success(function (resdata, status) {             
                              if(resdata.status == 200)
                              {
                                  alert('sucess..');
                                  $scope.b = {};
                              }else{
                                  alert('failed..')
                                  $scope.b = {};
                              }
                        })
                        .error(function (data, status, headers, config) {
                            if (status == 500) { }
                        })
                    }else{
                        alert('Already Addedd....!');
                    } 
            })
            .error(function (data, status, headers, config) {
                if (status == 500) { }
            })
        }
        $scope.getitem = function()
        {
        $http.get('http://localhost:7878/nodeapp/getItemData/')
        .success(function (resdata, status) {             
                $scope.items = resdata.data;
                console.log($scope.items)
        })
        .error(function (data, status, headers, config) {
            if (status == 500) { }
        })
        }
        $scope.getitem();
        //update data
        $scope.Edititem = function(i)
        {
            $scope.edititm = i;
            
        }
        $scope.updateitem = function(edititm)
        {
        $http.post('http://localhost:7878/nodeapp/getitmData', edititm)
        .success(function (resdata, status) {   
        if(resdata.status==200){
            alert("sucessfully updated...")
        }    
        else{
            alert("failed...")
        }
        })
        .error(function (data, status, headers, config) {
            if (status == 500) { }
        })
        }
        //update end
        //delete start
        $scope.deleteitem = function(id)
        {
          $http.get('http://localhost:7878/nodeapp/deleteitdata/' + id)
         .success(function (resdata, status) { 
         if(resdata.status == '200')
         {
           alert('successfully Deleted...!');
            $scope.getitem();                 
         }
        else{
          alert('Failed...!');
        }         
        
        })
        .error(function (data, status, headers, config) {
        if (status == 500) { }
        }) 
        }
        //delete end 
        //dt options start
        $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('responsive', true)
        .withDisplayLength(10)

        .withButtons([{
            extend: 'copy'
        },
        {
            extend: 'csv'
        },
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
        ]);
        //dt options end
       
    })
    //items end

    //purches start
    .controller('purchesCtrl', function ($scope, $http, $rootScope, DTOptionsBuilder) {       
               
        //code start
        $scope.purchesdata = function(p)
        {
            $http.post('http://localhost:7878/nodeapp/postPurchesData' , p)
            .success(function (resdata, status) {             
                  if(resdata.status == 200)
                  {
                      alert('sucess..');
                      $scope.p = {};
                  }else{
                      alert('failed..')
                      $scope.p = {};
                  }
            })
            .error(function (data, status, headers, config) {
                if (status == 500) { }
            })
        }
        $scope.getpur = function()
        {
          $http.get('http://localhost:7878/nodeapp/getPurchesData/')
         .success(function (resdata, status) {             
                 $scope.purches = resdata.data;
         })
         .error(function (data, status, headers, config) {
            if (status == 500) { }
         })
        }
        $scope.getpur();
        //dropdown start
        $http.get('http://localhost:7878/nodeapp/getRegData/')
        .success(function (resdata, status) {             
                $scope.vdata = resdata.data;
                
        })
        .error(function (data, status, headers, config) {
            if (status == 500) { }
        })
        $http.get('http://localhost:7878/nodeapp/getItemData/')
        .success(function (resdata, status) {             
                $scope.items = resdata.data;               
        })
        .error(function (data, status, headers, config) {
            if (status == 500) { }
        })
        // dropdown end

        //code end
        //hsn code start
        $scope.getHcncode = function(itemid)
        {
            $http.get('http://localhost:7878/nodeapp/gethsncodeData/' + itemid)
            .success(function (resdata, status) {             
                    $scope.p.code= resdata.data[0].code;                
            })
            .error(function (data, status, headers, config) {
                if (status == 500) { }
            })

        }
        //hsn code end
        //delete start
        $scope.deletepur = function(id)
       {
        $http.get('http://localhost:7878/nodeapp/deletepdata/' + id)
        .success(function (resdata, status) { 
        if(resdata.status == '200')
       {
         alert('successfully Deleted...!');
         $scope.getpur();                 
       }
       else{
         alert('Failed...!');
       }         
       })
       .error(function (data, status, headers, config) {
       if (status == 500) { }
       }) 
       }
       //update data
       $scope.Editpurdata = function(q)
       {
           $scope.editpur = q;
           
       }
       $scope.updatepurches = function(editpur)
       {
       $http.post('http://localhost:7878/nodeapp/updateData', editpur)
       .success(function (resdata, status) {   
       if(resdata.status==200){
           alert("sucessfully updated...")
           $scope.getpur();
       }    
       else{
           alert("failed...")
       }
       })
       .error(function (data, status, headers, config) {
           if (status == 500) { }
       })
       }
       //update end

        //dt options start
        $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('responsive', true)
        .withDisplayLength(10)

        .withButtons([{
            extend: 'copy'
        },
        {
            extend: 'csv'
        },
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
        ]);
        //dt options end
       
    })
    //purches end

    
    //cust0mer start
    .controller('custCtrl', function ($scope, $http, $rootScope, DTOptionsBuilder) {       
               
        //code start
        $scope.customerdata = function(c)
        {
            console.log(c.c_phno)
               $http.get('http://localhost:7878/nodeapp/checknumData/' + c.c_phno)
               .success(function (resdata, status) {             
                    $scope.numcheck = resdata.data[0].i;
                    console.log($scope.numcheck)
                    if($scope.numcheck==0) 
                  {
                    $http.post('http://localhost:7878/nodeapp/postcustData' , c)
                    .success(function (resdata, status) {             
                     if(resdata.status == 200)
                     {
                        alert('sucess..');
                        $scope.c = {};
                     }else{
                          alert('failed..')
                            $scope.c = {};
                     }
                   })
                  }
                  else{
                    alert('Existed PhNumber....!');
                   }
               })
            .error(function (data, status, headers, config) {
                if (status == 500) { }
            })
        }
        $scope.getcust=function()
        {
        $http.get('http://localhost:7878/nodeapp/getcustData/')
        .success(function (resdata, status) {             
                $scope.cdata = resdata.data;
                console.log($scope.cdata)
        })
        .error(function (data, status, headers, config) {
            if (status == 500) { }
        })
        }
        $scope.getcust();
        //delete start
        $scope.deletecust = function(id)
        {
         $http.get('http://localhost:7878/nodeapp/deletecdata/' + id)
         .success(function (resdata, status) { 
         if(resdata.status == '200')
        {
          alert('successfully Deleted...!');
          $scope.getcust();                 
        }
        else{
          alert('Failed...!');
        }         
        })
        .error(function (data, status, headers, config) {
         if (status == 500) { }
        }) 
        }
        //update start
        $scope.Editcdata = function(n)
        {
            $scope.editcust = n;
            
        }
        $scope.updatecustdata = function(editcust)
        {
        $http.post('http://localhost:7878/nodeapp/updatecustData', editcust)
        .success(function (resdata, status) {   
        if(resdata.status==200){
            alert("sucessfully updated...")
            $scope.getcust();
        }    
        else{
            alert("failed...")
        }
        })
        .error(function (data, status, headers, config) {
            if (status == 500) { }
        })
        }
        //update end
 
        //code end
        //dt options start
        $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('responsive', true)
        .withDisplayLength(10)

        .withButtons([{
            extend: 'copy'
        },
        {
            extend: 'csv'
        },
        {
            extend: 'print',
            customize: function (win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
        ]);
        //dt options end
       
    })
    //customer end

        //sales start
        .controller('salesCtrl', function ($scope, $http, $rootScope, DTOptionsBuilder) {       
               
            //code start
            $scope.salesdata = function(s)
            {
                $http.post('http://localhost:7878/nodeapp/postSalesData' , s)
                .success(function (resdata, status) {             
                      if(resdata.status == 200)
                      {
                          alert('sucess..');
                          $scope.s = {};
                      }else{
                          alert('failed..')
                          $scope.s = {};
                      }
                })
                .error(function (data, status, headers, config) {
                    if (status == 500) { }
                })
            }
            $scope.getsale=function()
            {
            $http.get('http://localhost:7878/nodeapp/getSalesData/')
            .success(function (resdata, status) {             
                    $scope.sales = resdata.data;
                    console.log($scope.sales)
            })
            .error(function (data, status, headers, config) {
                if (status == 500) { }
            })
            }
            $scope.getsale();
            //dropdown start
            $http.get('http://localhost:7878/nodeapp/getcustData/')
            .success(function (resdata, status) {             
                    $scope.cdata = resdata.data;
                    
            })
            .error(function (data, status, headers, config) {
                if (status == 500) { }
            })
            $http.get('http://localhost:7878/nodeapp/getItemData/')
            .success(function (resdata, status) {             
                    $scope.items = resdata.data;               
            })
            .error(function (data, status, headers, config) {
                if (status == 500) { }
            })
            // dropdown end
    
            //phnumber start
            $scope.custphno = function(cphn)
            {
                $http.get('http://localhost:7878/nodeapp/getcustphnoData/' + cphn)
                .success(function (resdata, status) {             
                        $scope.cno= resdata.data[0].c_phno; 
                        console.log($scope.cno)               
                })
                .error(function (data, status, headers, config) {
                    if (status == 500) { }
                })
    
            }
            //phnumber end

            //code end
            //dt options start
            $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withOption('responsive', true)
            .withDisplayLength(10)
    
            .withButtons([{
                extend: 'copy'
            },
            {
                extend: 'csv'
            },
            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
            ]);
            //dt options end
           
        })
        //sales end

    // ******************************************** interior Dashboard end *******************************************  

     

