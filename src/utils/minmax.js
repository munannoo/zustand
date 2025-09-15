const X = "X";
const O = "O";
const EMPTY = ""; // Emptry string represnts move not made
function toMatrix(boardArr) {
	return [boardArr.slice(0, 3), boardArr.slice(3, 6), boardArr.slice(6, 9)];
}


function actions(boardMatrix) {
	const moves = [];
	boardMatrix.forEach((row, i) => {
		row.forEach((val, j) => {
			if (val === EMPTY) moves.push([i, j]);
		});
	});
	return moves;
}

function result(boardMatrix, action, turn) {
	const [i, j] = action;
	const newBoard = boardMatrix.map((row) => row.slice());
	newBoard[i][j] = turn;
	return newBoard;
}

function winner(boardMatrix) {
	const lines = [
		...boardMatrix,
		...[0, 1, 2].map((c) => [boardMatrix[0][c], boardMatrix[1][c], boardMatrix[2][c]]),
		[boardMatrix[0][0], boardMatrix[1][1], boardMatrix[2][2]],
		[boardMatrix[0][2], boardMatrix[1][1], boardMatrix[2][0]],
	];
	for (const line of lines) {
		if (line[0] !== EMPTY && line.every((x) => x === line[0])) return line[0];
	}
	return null;
}

function terminal(boardMatrix) {
	if (winner(boardMatrix)) return true;
	return boardMatrix.every((row) => row.every((c) => c !== EMPTY));
}

function utility(boardMatrix) {
	const w = winner(boardMatrix);
	if (w === X) return 1;
	if (w === O) return -1;
	return 0;
}

const preference = [4, 0, 2, 6, 8, 1, 3, 5, 7];

function minimaxRec(boardMatrix, turn, depth) {
	if (terminal(boardMatrix)) {
		return { score: utility(boardMatrix), depth, action: null };
	}

	const moves = actions(boardMatrix);
	if (turn === X) {
		let best = { score: -Infinity, depth: Infinity, action: null };
		for (const act of moves) {
			const child = result(boardMatrix, act, X);
			const evalRes = minimaxRec(child, O, depth + 1);
			const flatIndex = act[0] * 3 + act[1];
			if (
				evalRes.score > best.score ||
				(evalRes.score === best.score && evalRes.score === 1 && evalRes.depth < best.depth) ||
				(evalRes.score === best.score && evalRes.score === 0 && preference.indexOf(flatIndex) < preference.indexOf(best.action ? best.action[0] * 3 + best.action[1] : 100))
			) {
				best = { score: evalRes.score, depth: evalRes.depth, action: act };
				if (best.score === 1 && best.depth === depth + 1) break;
			}
		}
		return best;
	} else {
		let best = { score: Infinity, depth: -Infinity, action: null };
		for (const act of moves) {
			const child = result(boardMatrix, act, O);
			const evalRes = minimaxRec(child, X, depth + 1);
			const flatIndex = act[0] * 3 + act[1];
			if (
				evalRes.score < best.score ||
				(evalRes.score === best.score && evalRes.score === -1 && evalRes.depth > best.depth) || // delay loss
				(evalRes.score === best.score && evalRes.score === 0 && preference.indexOf(flatIndex) < preference.indexOf(best.action ? best.action[0] * 3 + best.action[1] : 100))
			) {
				best = { score: evalRes.score, depth: evalRes.depth, action: act };
				if (best.score === -1 && best.depth === depth + 1) break; // immediate winning move for O
			}
		}
		return best;
	}
}

// Use this as an api for the ai to calculate the best move
export function bestMove(boardArray, currentPlayer) {
	const boardMatrix = toMatrix(boardArray);
	if (terminal(boardMatrix)) return null;
	const { action } = minimaxRec(boardMatrix, currentPlayer, 0);
	if (!action) return null;
	return action[0] * 3 + action[1];
}

export function isTerminal(boardArray) {
	return terminal(toMatrix(boardArray));
}

export function getWinner(boardArray) {
	return winner(toMatrix(boardArray));
}

export function evaluate(boardArray) {
	return utility(toMatrix(boardArray));
}

export default bestMove;

