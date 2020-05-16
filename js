


function Game() {
  var data = new vis.DataSet(options);
  this.nodes = new vis.DataSet(options);
  this.edges = new vis.DataSet(options);
  this.lifes = new Array([]);
  this.network_size = 0;
  this.network;
  this.take_color = {0: "black", 1: "red", 2: "yellow", 3: "green"};

  function get_new_network() {
    this.network_size = 5;
    this.lifes = [1, 1, 2, 0, 1, 1];
    edges_got = [
		  {from: 1, to: 3},
		  {from: 2, to: 4},
		  {from: 3, to: 2},
		  {from: 4, to: 5},
		  {from: 5, to: 5}
		];
    var i;
    for (i = 0; i < this.network_size; i++) {
      this.nodes.add({id: i, label: '', color: take_color[this.lifes[i]]}, shape: 'circle', border: '1', borderSelected: '1');
    }
    for (i = 0; i < this.edges_got.size(); i++) {
      this.nodes.add({id: i, label: '', color: take_color[this.lifes[i]]}, color: 'blue');
    }
  }

  
  function myFunction(event) {
    console.log(event);
  }

}




function 


// create an array with nodes
var nodes = new vis.DataSet([
  {id: 1, label: 'Node 1'},
  {id: 2, label: 'Node 2'},
  {id: 3, label: 'Node 3'},
  {id: 4, label: 'Node 4'},
  {id: 5, label: 'Node 5'}
]);

// create an array with edges
var edges = new vis.DataSet([
  {from: 1, to: 4},
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
var nodes2 = new vis.DataSet([
  {id: 1, label: 'Node 1'},
  {id: 2, label: 'Node 2'},
  {id: 3, label: 'Node 3'},
  {id: 4, label: 'Node 4'},
  {id: 5, label: 'Node 5'}
]);

var edges2 = new vis.DataSet([
  {from: 1, to: 1},
  {from: 2, to: 2},
  {from: 3, to: 3},
  {from: 4, to: 4},
  {from: 5, to: 5}
]);

var data2 = {
  nodes: nodes2,
  edges: edges2
};

setTimeout(() => { network.setData(data2);}, 2000);
// document.getElementById("mynetwork").addEventListener("selectNode", myFunction);
network.on("selectNode", myFunction);



