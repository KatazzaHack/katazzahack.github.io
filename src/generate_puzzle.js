
// generate clique puzzle
function generate_clique_puzzle(n) {
  let gr = new Array(n);
  for (let i = 0; i < n; i++) {
    gr[i] = new Array(n).fill(1);
    gr[i][i] = 0;
  }
  return gr;
}

function generate_tree_puzzle(n) {
  var gr = new Array(n);
  for (let i = 0; i < n; i++) {
    gr[i] = new Array(n).fill(0);
  }
  var Rank = new Array(n).fill(0);
  var Parent = new Array(n).fill(0);
  for (let i = 0; i < n; ++i) {
    Parent[i] = i;
    Rank[i] = 0;
  }

  var find_parent = function(p) {
    if (p != Parent[p]) {
      Parent[p] = find_parent(Parent[p]);
    }
    return Parent[p];
  }

  var union_vertex = function (a, b) {
    let p_a = find_parent(a);
    let p_b = find_parent(b);
    if (p_a === p_b) {
      return 0;
    }
    if (Rank[p_a] < Rank[p_b]) {
      [p_a, p_b] = [p_b, p_a]
    }
    Parent[p_b] = p_a;
    if (Rank[p_a] === Rank[p_b]) {
      Rank[p_a] = Rank[p_a] + 1;
    }
    gr[a][b] = 1;
    gr[b][a] = 1;
    return 1;
  }

  let cnt = 0;
  while (cnt + 1 < n) {
    let a_node = Math.floor(Math.random() * n);
    let b_node = Math.floor(Math.random() * n);
    cnt = cnt + union_vertex(a_node, b_node);
  }
  return gr;
}

function generate_circle_puzzle(n) {
  let gr = new Array(n);
  for (let i = 0; i < n; i++) {
    gr[i] = new Array(n).fill(0);
    gr[i][(i + 1) % n] = 1;
  }
  return gr;
}

function generate_random_puzzle(n) {
  let pr = Math.random();
  let gr = new Array(n);
  for (let i = 0; i < n; i++) {
    gr[i] = new Array(n).fill(0);
    for (let j = 0; j < i; j++) {
      if (i !== j && Math.random() < pr) {
        gr[i][j] = 1;
      }
    }
  }
  return gr;
}

function generate_equal_lifes(n) {
  return new Array(n).fill(Math.floor((Math.random() * 3) + 1));
}


function generate_one_big_lifes(n) {
  let a = new Array(n).fill(1);
  a[Math.floor(Math.random() * n)] = 3;
  return a;
}

function generate_random_lifes(n) {
  let a = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    a[i] = Math.floor((Math.random() * 3) + 1);
  }
  return a;
}

function Puzzle(graph, lifes, size) {
  this.graph = graph;
  this.lifes = lifes;
  this.size = size;
}


// n - size of the puzzle
// g_type one of "tree", "clique", "circle", "random"
// l_type one of "equal", "onebig", "random"
function generate_puzzle(n, g_type, l_type) {
  let graph_f;
  switch(g_type) {
  case "tree":
    graph_f = generate_tree_puzzle;
    break;
  case "clique":
    graph_f = generate_clique_puzzle;
    break;
  case "circle":
    graph_f = generate_circle_puzzle;
    break;
  default:
    graph_f = generate_random_puzzle;
    break;
  }
  let lifes_f;
  switch(l_type) {
  case "equal":
    lifes_f = generate_equal_lifes;
    break;
  case "onebig":
    lifes_f = generate_one_big_lifes;
    break;
  default:
    lifes_f = generate_random_lifes;
    break;
  }
  return solve_puzzle(new Puzzle(graph_f(n), lifes_f(n), n));
}

function calculate_budget(puzzle) {
  let sum = 0;
  for (let i = 0; i < puzzle.size; i++) {
    sum = sum + puzzle.lifes[i] * 100;
  }
  return sum
}

// returns puzzle with budget field and graph representation as list of edges.
function solve_puzzle(puzzle) {
  let edges_cnt = 0;
  let budget = calculate_budget(puzzle);
  for (let i = 0; i < puzzle.size; i++) {
    for (let j = 0; j < puzzle.size; j++) {
      edges_cnt += puzzle.graph[i][j];
    }
  }
  edges_cnt = edges_cnt / 2;
  var edges = new Array(edges_cnt);
  edges_cnt = edges_cnt - 1;
  for (let i = 0; i < puzzle.size; i++) {
    for (let j = i + 1; j < puzzle.size; j++) {
      if (puzzle.graph[i][j] === 1) {
        edges[edges_cnt] = [i, j];
        edges_cnt = edges_cnt - 1;
      }
    }
  }
  puzzle.graph = edges;
  puzzle.budget = budget
  return puzzle;
}
