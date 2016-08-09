(function(){
  function LandingCtrl($scope){
    $scope.currentPlayer = 1;
    
    var gridX = 6;
    var gridY = 7;
    
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
    
    var matchesHorizontal = function(spaceArr){      
      var inRow = _.groupBy(spaceArr, 'y');
      var result = false;
      
      _.each(inRow, function(row){ 
        if(row.length == 4){
          result = true;;
        }
      });
      
      return result;
    }
    
    var matchesVertical = function(spaceArr){      
      var inRow = _.groupBy(spaceArr, 'x');
      var result = false;

      _.each(inRow, function(row){ 
        if(row.length == 4){
          result = true;;
        }
      });

      return result;
    }
    
    var matchesDiagonal = function(spaceArr){
      var matches = 1;
      _.reduce(spaceArr, function(memo, space){
        if(memo != null){
          if(space.x == memo.x){
            matches++;
          }
        }

        return space;
      });

      return matches == 4;
    }
    
    
    var checkMatches = function(){      
//      console.log('checking matches');
      var flatGrid = _.flatten($scope.gridArr);
      
      var p1Spaces = _.filter(flatGrid, function(space){ return space.owner == 1; })
      var p2Spaces = _.filter(flatGrid.gridArr, function(space){ return space.owner == 2; })
      
//      console.log('p1 spaces',p1Spaces);
//      console.log('p2 spaces',p2Spaces);
      
      var matches = 1;
      
      if(matchesHorizontal(p1Spaces) || matchesVertical(p1Spaces)
         || matchesHorizontal(p2Spaces) || matchesHorizontal(p2Spaces)){
         return true;
      }
      
//      matchesHorizontal(p2Spaces);
//      matchesVertical(p2Spaces);
//      matchesDiagonal();
      
//      Horizontal
//      _.reduce(p1Spaces, function(memo, space){
//        if(memo != null){
//          if(space.y == memo.y){
//            matches++;
//          }
//        }
//
//        return space;
//      });
//      
//      
//      
//      console.log('matches',matches);
//      
//      if (matches == 4){
//        return true;
//      }
      
//      console.log('player 1 spaces ' + p1Spaces);
//      console.log('player 2 spaces ' + p2Spaces);
      
//      _.each($scope.gridArr, function(row){
//        _.each(row, function(space){
//          if(space.owner)
//        })
//      });
      
      
//      for(var i = 0; i < gridX; i++){
//        for(var j = 0; j < gridY; j++){
//          if($scope.gridArr[i][j].owner)
//        }
//      }
      
//      Template
//      for(var i = 0; i < gridX; i++){
//        for(var j = 0; j < gridY; j++){
//          
//        }
//      }

      
      
//      
//      for(var p = 1; p <= 2; p++ ){
//        matches = 0;
//        
//        for(var i = 0; i < gridX; i++){
//          matches = 0;
//          for(var j = 0; j < gridY; j++){
////            if($scope.gridArr[i][j].owner != null){
////              console.log('testing ' , $scope.gridArr[i][j]);
////            }
//            
//            
//            
//            
//            if($scope.gridArr[i][j].owner == p){
//              matches++;
//              
//              console.log('matches in a row', matches, 'for player', p);
//              
//              if(matches == 4){
//                return true;
//              }
//            }
//          }
//        }      
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