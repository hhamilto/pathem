_ = require('lodash')
debug = false

stringify = function(board){
	return board.join('\n')
}

cloneBoard = function(board){
	return _.map(board, function(row){
		return row.slice()
	})
}

key = function(board, word){
	return stringify(board)+word.join('')
}
memo = {}
getAllDirectionLocations = function(board,coord){
	if(!coord)
		return _.flatten(_.map(_.range(board.length), i=>{
			return _.map(_.range(board[0].length), j=>{
				return [i,j]
			})
		}))
	return _.filter([[coord[0]-1, coord[1]-1],
			        [coord[0]-1, coord[1]  ],
			        [coord[0]-1, coord[1]+1],
			        [coord[0]  , coord[1]-1],
			        [coord[0]  , coord[1]+1],
			        [coord[0]+1, coord[1]-1],
			        [coord[0]+1, coord[1]  ],
			        [coord[0]+1, coord[1]+1],
			        [coord[0]  , coord[1]  ]], function(p){
			        	return p[0]>=0 && p[1]>=0 && p[0]<board.length&& p[1] < board[0].length
			        })
}
getLocations = function(board, coord, nextLetter){
	var directionLocations = getAllDirectionLocations(board,coord)
	debug&&console.log(directionLocations)
	if(_.includes(_.flatten(board), nextLetter)){
		var l
		while(l = directionLocations.pop())
			if(board[l[0]][l[1]] == nextLetter)
				return [l]
		return []
	}
	return _.filter(directionLocations,
		function(p){
			return board[p[0]][p[1]] == '.' || board[p[0]][p[1]] == nextLetter
		})
}

solve = function(board, word, coord){
	debug&&console.log('solving: '+word)
	debug&&console.log(stringify(board))
	debug&&console.log()
	if(memo[key(board, word)])
		return memo[key(board, word)]
	if(word.length == 0)
		return [[coord],board]
	var nextLetter = word.shift()
	var potentialLocations = getLocations(board, coord, nextLetter)
	while(potentialLocations.length>0){
		var l = potentialLocations.pop()
		var newBoard = cloneBoard(board)
		newBoard[l[0]][l[1]] = nextLetter
		var ans = solve(newBoard, word.slice(), l)
		if(ans){
			ans[0].unshift(l)
			return ans
		}
	}
	memo[key(board, word)] = false
	return false
}

rawProblem = '';
appendData = data => {
	rawProblem += data
}
parse = rawProblem => {
	var letterString, letters, boardString, board
	boardString = rawProblem.split(/\n\n/)[0]
	letterString = rawProblem.split(/\n\n/)[1]
	letters = letterString.replace(/\W/g,'').toLowerCase().split('')
	board = _.map(boardString.split('\n'),line=>line.split(''))
	return [board,letters]
}
process.stdin.on('data', appendData)
process.stdin.on('end', () => {
	var problem = parse(rawProblem)
	
	solution = solve(problem[0], problem[1], undefined)

	console.log(stringify(solution[1]))
	console.log()
	console.log(solution[0].join('\n'))

})
