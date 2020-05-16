function myFunction(event) {
  console.log(event);
}

// create an array with nodes
var nodes = new vis.DataSet([
  {id: 0, label: '', color: 'red', shape: 'circle', size: 100},
  {id: 1, label: '', color: 'green', shape: 'circle', size: 10},
  {id: 2, label: 'Node 3'},
  {id: 3, label: 'Node 4'},
  {id: 4, label: 'Node 5'}
]);

// create an array with edges
var edges = new vis.DataSet([
  {from: 0, to: 4, color: 'green'},
  {from: 2, to: 4},
  {from: 2, to: 5},
  {from: 3, to: 3}
]);

// create a network
var container = document.getElementById('mynetwork');
var data = {
  nodes: nodes,
  edges: edges
};
var options = {};
var network = new vis.Network(container, data, options);

function Game() {
  var data = new vis.DataSet(options);
  this.nodes = new vis.DataSet(options);
  this.edges = new vis.DataSet(options);
  this.lifes = new Array([]);
  this.network_size = 0;
  this.network;
  this.take_color = {0: "black", 1: "red", 2: "yellow", 3: "green"};
  this.take_image = {3: {0: "https://ibb.co/H2TY78Z", 1: "https://ibb.co/bvkxQzq", 2: "https://ibb.co/XXdn2vF"},
                     2: {0: "https://ibb.co/Bf77gcX", 1: "https://ibb.co/WcbNSX9", 2: "https://ibb.co/fHTTm4p"},
                     1: {0: "https://ibb.co/bQ1k7rb", 1: "https://ibb.co/s2yshNj", 2: "https://ibb.co/6JgbLND"}};


}

Game.prototype.get_new_network = function () {
  this.lifes = [1, 1, 2, 0, 1, 1, 1, 2, 3];
  var edges_got = [[1, 3], [1, 4], [0, 2], [1, 5], [7, 4], [1, 8], [7, 8]];
  this.types = new Array();
  this.network_size = this.lifes.length;
  for (var i = 0; i < this.network_size; ++i) {
    this.types.push(Math.floor(Math.random() * 3)); 
  }
  for (var i = 0; i < this.network_size; i++) {
    if (this.lifes[i] != 0) {
      this.nodes.add({id: i, label: '', image: this.take_image[this.lifes[i]][this.types[i]], shape: 'circularImgae', border: '1', borderWidthSelected: '10'});
    }
  }
  for (var i = 0; i < edges_got.length; i++) {
    this.edges.add({from: edges_got[i][0], to: edges_got[i][1], color: 'blue'});
  }
};

Game.prototype.draw_first_network = function () {
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: this.nodes,
    edges: this.edges
  };
  var options = {};
  this.network = new vis.Network(container, data, options);
}


qwe = new Game();
qwe.get_new_network();
qwe.draw_first_network();
