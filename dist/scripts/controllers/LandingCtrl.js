(function(){
  function LandingCtrl($scope){
    $scope.currentPlayer = 1;
    
    var gridX = 6;
    var gridY = 7;
    
    const NUM_IN_A_ROW = 4;
    
    $scope.gridArr = new Array();
    $scope.flatGrid = new Array();
    
    $scope.generateGrid = function(){
      for(var i = 0; i < gridX; i++){
        colArr = [];
        for(var j = 0; j < gridY; j++){
          var space = {y: i, x: j, owner: null};
          colArr.push(space);
          $scope.flatGrid.push(space);
        }
        
        $scope.gridArr.push(colArr);
      }      
    };
    
    $scope.generateGrid();
    
    var togglePlayer = function(){
      return $scope.currentPlayer == 1 ? 2 : 1;
    }
    
    $scope.getSpaceClass = function(space){
      var classStr = 'grid-space';
      var newClass = '';
      
      switch (space.owner){
        case 1:
          newClass = 'space-player1';
          break;
        case 2:
          newClass = 'space-player2';
          break;
        default:
          break;
      }
      
      return classStr + ' ' + newClass
    }
    
    var getBottomSpace =  function(x){
      for(var i = gridX-1; i >= 0; i--){
        if($scope.gridArr[i][x].owner == null){
          return $scope.gridArr[i][x];
        }
      }
    };
    
    var getNumConsecutive = function(arr){
      if(arr.length < 2){
        return 1;
      }

      var count = 1;
      var highestCount = 1;

      arr.sort(function(a,b){return a-b});

      for(var i = arr.length-1; i > 0; i--){
        if( Math.abs(arr[i] - arr[i-1]) == 1 ) {
          count++;
          if(count > highestCount){
            highestCount = count;
          }
        }else{
          count=1;
        }
      }

      return highestCount;
    }
    
    var testMatchAxis = function(arr, axis){
      var altAxis = (axis == 'x' ? 'y' : 'x');
      var inRow = _.groupBy(arr, axis);
      
      var result = false;           

      var vals = [];

      _.each(inRow, function(row){
        vals = [];
        _.each(row, function(space){
          vals.push(space[altAxis]);
        });
        
        var num = getNumConsecutive(vals);
        
        if(num == NUM_IN_A_ROW){
          result = true;
        }
      });

      return result;
    }
    
      
    var testDiagonal = function(){
//      var arr = _.flatten($scope.gridArr);
      var arr = $scope.flatGrid;
//      console.log(arr);
      
      var i = 0;
      var count = 1;
      var highestCount = 1;
      var inc = gridX + 2;
      
      console.log('****************************');
//      for
      
//      while(i < gridX || count < 3){
      while((i+inc < arr.length)){
        if(arr[i+inc]){
//          console.log(arr[i],'vs',arr[i+inc]);
          if(arr[i].owner == arr[i+inc].owner && arr[i].owner != null){
            count++;
            
            if(count > highestCount){
              highestCount = count;
            }
            
            console.log('hit!', arr[i],'and',arr[i+inc],'count',highestCount);
          }else{
            count=1;
          }
        }
        
        i++;
//        highestCount = 0;
      }
      
//      
//      while((i+gridX) < (gridX) || count < 4){        
////        if(arr[i][i].owner == arr[i+gridX][i+gridX].owner && arr[i][i].owner != null){
////        console.log(arr[i],'vs',arr[i+gridX]);
////        console.log(gridX+1);
//        if(arr[i].owner == arr[i+gridX].owner && arr[i].owner != null){
//            count++;
//          
//            if(count > highestCount){
//              highestCount = count;
//            }
//          }else{
//            count=1;
//          }
//        
//        i++;
//      }
//      
      if(highestCount > 3){
        return true;
      }else{
        return false;
      }
    }
    
    
        
    var checkMatches = function(){      
      var flatGrid = _.flatten($scope.gridArr);
      
      var p1Spaces = _.filter(flatGrid, function(space){ return space.owner == 1; })
      var p2Spaces = _.filter(flatGrid, function(space){ return space.owner == 2; })
      
      var matches = 1;
      
      if(testMatchAxis(p1Spaces,'x') || testMatchAxis(p1Spaces,'y')
         || testMatchAxis(p2Spaces,'x') || testMatchAxis(p2Spaces,'y')
        || testDiagonal()){
         return true;
      };
      
      return false;
    }
    
    $scope.gridClick = function(space){
      if(!space.owner){
//        var bottomSpace = getBottomSpace(space.x);
//        bottomSpace.owner = $scope.currentPlayer;
        space.owner = $scope.currentPlayer;
        var result = checkMatches();
        
        if(!result){
          console.log('no matches found');
        }else{
          console.log('Player ',$scope.currentPlayer,'wins!');
        }
//        $scope.currentPlayer = togglePlayer();
      }
    };    
  }
  
  angular
    .module('connect4')
    .controller('LandingCtrl',['$scope', LandingCtrl]);
})();