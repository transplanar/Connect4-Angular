(function(){
  function LandingCtrl($scope){
    $scope.currentPlayer = 1;
    
    var gridX = 6;
    var gridY = 7;
    
    const NUM_IN_A_ROW = 4;
    
    $scope.gridArr = new Array();
    
    $scope.generateGrid = function(){
      for(var i = 0; i < gridX; i++){
        colArr = [];
        for(var j = 0; j < gridY; j++){
          colArr.push({y: i, x: j, owner: null});
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
      console.log('test consecutive on',arr);
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
      var inRow = _.groupBy(arr, axis);
      var result = false;           

      var vals = [];

      _.each(inRow, function(row){
        _.each(row, function(space){
          vals.push(space[axis]);
        })

        var num = getNumConsecutive(vals);
        console.log('consec',num);
          
        
        if(num == NUM_IN_A_ROW){
          result = true;
        }
      });

      return result;
    }
    
    var matchesVertical = function(spaceArr){      
      var inCol = _.groupBy(spaceArr, 'x');
      var result = false;

      _.each(inCol, function(col){ 
        if(col.length == 4){
          result = true;;
        }
      });

      return result;
    }
        
    var checkMatches = function(){      
      var flatGrid = _.flatten($scope.gridArr);
      
      var p1Spaces = _.filter(flatGrid, function(space){ return space.owner == 1; })
      var p2Spaces = _.filter(flatGrid, function(space){ return space.owner == 2; })
            
      var matches = 1;
      
      if(testMatchAxis(p1Spaces,'x') || testMatchAxis(p1Spaces,'y')){
         return true;
      };
      
//      if(matchesHorizontal(p1Spaces) || matchesVertical(p1Spaces)
//         || matchesHorizontal(p2Spaces) || matchesVertical(p2Spaces)){
//         return true;
//      }
      
      return false;
    }
    
    $scope.gridClick = function(space){
      if(!space.owner){
        var bottomSpace = getBottomSpace(space.x);
        bottomSpace.owner = $scope.currentPlayer;
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
//    .controller('LandingCtrl',['$scope', '_', LandingCtrl]);
    .controller('LandingCtrl',['$scope', LandingCtrl]);
})();