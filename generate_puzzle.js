
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

function Puzzle(graph, lifes, size, g_type, l_type) {
  this.graph = graph;
  this.lifes = lifes;
  this.size = size;
  this.g_type = g_type;
  this.l_type = l_type;
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
  return solve_puzzle(new Puzzle(graph_f(n), lifes_f(n), n, g_type, l_type));
}

function calculate_budget(puzzle) {
  let sum = 0;
  for (let i = 0; i < puzzle.size; i++) {
    sum = sum + puzzle.lifes[i] * 100;
  }
  alert(sum);
  var coef = [100, 200, 400];
  for (let iteration = 0; iteration < 10000; iteration++) {
    let ng = JSON.parse(JSON.stringify(puzzle));
    let cs = 0;
    let ln = puzzle.size;
    while (ln > 0) {
      let life_nodes = Array(ln).fill(0);
      let pos = 0;
      for (let i = 0; i < puzzle.size; i++) {
        if (ng.lifes[i] > 0) {
          life_nodes[pos] = i;
          pos++;
        }
      }
      let v = life_nodes[Math.floor(Math.random() * pos)];
      let action = Math.floor(Math.random() * 3);
      let to_del = new Set();
      cs += coef[action];
      if (action === 0) {
        to_del.add(v);
      }
      if (action === 1) {
        to_del.add(v)
        for (let q = 0; q < ng.size; q++) {
          if (ng.graph[v][q] === 1) {
            to_del.add(q);
          }
        }
      }
      if (action === 2) {
        to_del.add(v);
        for (let q = 0; q < ng.size; q++) {
          if (ng.graph[v][q] === 1) {
            to_del.add(q);
            for (let w = 0; w < ng.size; w++) {
              if (ng.graph[q][w] === 1) {
                to_del.add(w);
              }
            }
          }
        }
      }
      for (let u of to_del) {
        ng.lifes[u]--;
        if (ng.lifes[u] === 0) {
          ln--;
          for (let t = 0; t < ng.size; t++) {
            ng.graph[t][u] = 0;
            ng.graph[u][t] = 0;
          }
        }
      }
    }
    sum = Math.min(sum, cs);
  }
  return sum;
}

// returns puzzle with budget field and graph representation as list of edges.
function solve_puzzle(puzzle) {
  let edges_cnt = 0;
  let budget = calculate_budget(puzzle);
  for (let i = 0; i < puzzle.size; i++) {
    for (let j = i + 1; j < puzzle.size; j++) {
      edges_cnt += puzzle.graph[i][j];
    }
  }
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
