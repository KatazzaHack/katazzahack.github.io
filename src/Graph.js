import { DataSet } from "vis-data/peer/esm/vis-data";
import { Network } from "vis-network/peer/esm/vis-network";

var vis = require("vis-network");

function Graph() {
  var data = new DataSet({});
  this.nodes = new DataSet({});
  this.edges = new DataSet({});
  this.lifes = new Array([]);
  this.matrix = new Array();
  this.network_size = 0;
  this.budget = 0;
  this.network = 0;
  this.prices = [100, 200, 400];
  this.options = {
    autoResize: true,
    nodes: {
      borderWidth:4,
      size: 50,
      color: {
        border: '#222222',
        background: '#666666'
      },
      font:{color:'#eeeeee'}
    },
    edges: {
      color: 'lightgray'
    },
    interaction: {
      dragView: false
    }
  };
  this.click_type = -1;
  this.edges_list = new Array();
  this.nodes_to_change = new Array();
  this.container = document.getElementById('game-container');
  this.take_color = {0: "black", 1: "red", 2: "yellow", 3: "green"};
  // this.img_dir = "%PUBLIC_URL%/sources/images/" https://github.com/KatazzaHack/katazzahack.github.io/blob/master/source/images/mask1.png?raw=true
  // this.img_dir = "https://raw.githubusercontent.com/KatazzaHack/katazzahack.github.io/master/source/images/";
  this.img_dir = "%PUBLIC_URL%/source/images/";
  this.take_image = {
3: {0: this.img_dir + "mask1.png",
    1: this.img_dir + "mask2.png",
    2: this.img_dir + "mask3.png"},
2: {0: this.img_dir + "nomask1.png",
    1: this.img_dir + "nomask2.png",
    2: this.img_dir + "nomask3.png"},
1: {0: this.img_dir + "vir1.png",
    1: this.img_dir + "vir2.png",
    2: this.img_dir + "vir3.png"}};

}

Graph.prototype.get_new_network = function () {
  // this.lifes = [1, 1, 2, 0, 1, 1, 1, 2, 3];
  // var edges_got = [[0, 2], [1, 3], [1, 4], [1, 5] , [1, 8], [4, 7],  [7, 8]];
  let n_size = Math.floor(Math.random() * 20) + 5;
  let g_type = ["tree", "random", "clique", "circle"][Math.floor(Math.random() * 4)];
  let f_type = ["unique", "random", "onebig"][Math.floor(Math.random() * 3)];
  let gg = generate_puzzle(n_size, g_type, f_type);
  this.budget = gg.budget;
  this.lifes = JSON.parse(JSON.stringify(gg.lifes));
  var edges_got = JSON.parse(JSON.stringify(gg.graph));
  this.edges_list = edges_got.slice();
  this.types = new Array();
  this.matrix = new Array();
  this.network_size = this.lifes.length;
  for (let i = 0; i < this.network_size; ++i) {
    this.types.push(Math.floor(Math.random() * 3));
    this.matrix.push(new Array());
  }
  for (let i = 0; i < edges_got.length; i++) {
    if ((this.lifes[edges_got[i][0]] != 0) && (this.lifes[edges_got[i][1]] != 0)) {
      this.matrix[edges_got[i][0]].push(edges_got[i][1]);
      this.matrix[edges_got[i][1]].push(edges_got[i][0]);
    }
  }
};

Graph.prototype.draw_network = function () {
  for (let i = 0; i < this.network_size; i++) {
    if (this.lifes[i] != 0) {
      this.nodes.add({id: i + 1, label: '', image: this.take_image[this.lifes[i]][this.types[i]], shape: 'circularImage',
      border: '1', borderWidthSelected: '10', color: this.take_color[this.lifes[i]]});
    }
  }
  for (let i = 0; i < this.edges_list.length; i++) {
    this.edges.add({from: this.edges_list[i][0] + 1, to: this.edges_list[i][1] + 1, color: 'blue'});
  }
  var data = {
    nodes: this.nodes,
    edges: this.edges
  };

  this.network = new Network(this.container, data, this.options);
  //document.getElementById('stats_during_game').text = "Your current budget is:" + this.budget;
}

Graph.prototype.set_click_type = function (click_type) {
  this.click_type = click_type;
}

Graph.prototype.on_node_selected = function (event) {
  var selected_node = event.nodes[0] - 1;
  console.log(selected_node);
}

Graph.prototype.on_click = function (event) {
  // TODO() remove this after communications with Game will be established
  this.click_type = 2;
  if (event.nodes.length == 0) {
    return;
  }

  var selected_node = event.nodes[0] - 1; // effect +- 1
  console.log("Selected node: " + selected_node);
  if (this.budget < this.prices[this.click_type]) {
    alert("Not enough money");
    return 1;
  }
  if (!(this.click_type in [0, 1, 2])) {
    alert("Please select a click type");
    return 1;
  }
  var nodes_to_decrease = new Array();
  nodes_to_decrease.push(selected_node);
  for (let counter = 0; counter < this.click_type; ++counter) {
    let max_cnt = nodes_to_decrease.length;
    for (let i = 0; i < max_cnt; ++i) {
      let vertex = nodes_to_decrease[i];
      for (let j = 0; j < this.matrix[vertex].length; ++j) {
        let maybe_new = this.matrix[vertex][j];
        if (!(nodes_to_decrease.includes(maybe_new))) {
          nodes_to_decrease.push(maybe_new);
        }
      }
    }
  }
  console.log(nodes_to_decrease);
  this.decrease_life(nodes_to_decrease);
  this.redraw_network();
  this.budget = this.budget - this.prices[this.click_type];
  //document.getElementById('stats_during_game').text = "Your current budget is:" + this.budget;
  
}

Graph.prototype.decrease_life = function (nodes_to_decrease) {
  this.nodes_to_change = new Array();
  for (let c = 0; c < nodes_to_decrease.length; c++) {
    this.lifes[nodes_to_decrease[c]] = this.lifes[nodes_to_decrease[c]] - 1;
    this.nodes_to_change.push(nodes_to_decrease[c]);
  }
  let new_edges_list = new Array();
  for (let i = 0; i < this.edges_list.length; ++i) {
    if ((this.lifes[this.edges_list[i][0]] != 0) && (this.lifes[this.edges_list[i][1]] != 0)) {
      new_edges_list.push(this.edges_list[i].slice());
    }
  }
  this.edges_list = new Array();
  for (let c = 0; c < new_edges_list.length; c++) {
    this.edges_list.push(new_edges_list[c].slice());
  }

  this.matrix = new Array();
  for (let i = 0; i < this.network_size; ++i) {
    this.matrix .push(new Array());
  }
  for (let i = 0; i < this.edges_list.length; i++) {
    if ((this.lifes[this.edges_list[i][0]] != 0) && (this.lifes[this.edges_list[i][1]] != 0)) {
      this.matrix[this.edges_list[i][0]].push(this.edges_list[i][1]);
      this.matrix[this.edges_list[i][1]].push(this.edges_list[i][0]);
    }
  }
  
}

Graph.prototype.redraw_network = function () {
  for (let i = 0; i < this.network_size; ++i) {
    if (this.nodes_to_change.includes(i)) {
      if (this.lifes[i] == 0) {
        this.nodes.remove({id:i + 1});
      } else {
        this.nodes.update([{id:i + 1, image: this.take_image[this.lifes[i]][this.types[i]], color: this.take_color[this.lifes[i]]}]);
      }
    }
  }
}

Graph.prototype.add_public_notice = function () {
  document.getElementById('public-notice').text = "Your current budget is:" + this.budget;
}


Graph.prototype.init_listeners = function () {
  this.network.on("selectNode", this.on_node_selected);
  this.network.on("click", this.on_click.bind(this));
}

Graph.prototype.prepare = function () {
  this.get_new_network();
}

Graph.prototype.start = function () {
  this.prepare();
  this.draw_network();
  this.init_listeners();
  this.add_public_notice();
}

Graph.prototype.setzero = function () {
  this.set_click_type(0);
}

Graph.prototype.setone = function () {
  this.set_click_type(1);
}
Graph.prototype.settwo = function () {
  this.set_click_type(2);
}


<<<<<<< HEAD:public/Graph.js
// q = new Graph();
// q.start();
=======
 //q = new Graph();
 //q.start();
>>>>>>> c63818b6272eec3a5894422d2031dd7a4efd4711:src/Graph.js

// generate clique puzzle
function generate_clique_puzzle(n) {
  let gr = new Array(n);
  for (let i = 0; i < n; i++) {
    gr[i] = new Array(n).fill(1);
    gr[i][i] = 0;
  }
  if (n > 10) {
    for (let j = 0; j < Math.floor(0.5 * n * n); j++) {
      let a_node = Math.floor(Math.random() * n);
      let b_node = Math.floor(Math.random() * n);
      gr[a_node][b_node] = 0;
      gr[b_node][a_node] = 0;
    }
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
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      gr[i][j] |= gr[j][i];
      gr[j][i] |= gr[i][j];
    }
  }
  return gr;
}

function generate_random_puzzle(n) {
  if (n < 9) {
    return generate_circle_puzzle(n);
  }
  let gr = generate_tree_puzzle(n);
  for (let i = 0; i < n;) {
    let a_node = Math.floor(Math.random() * n);
    let b_node = Math.floor(Math.random() * n);
    if (gr[a_node][b_node] == 0) {
      gr[a_node][b_node] = 1;
      gr[b_node][a_node] = 1;
      i++;
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

export default Graph;
