function Graph() {
  var options = {};
  var data = new vis.DataSet(options);
  this.nodes = new vis.DataSet(options);
  this.edges = new vis.DataSet(options);
  this.list_edges = new Array([]);
  this.lifes = new Array([]);
  this.matrix = new Array();
  this.network_size = 0;
  this.network;
  this.click_type = -1;
  this.take_color = {0: "black", 1: "red", 2: "yellow", 3: "green"};
  this.take_image = {
3: {0: "https://raw.githubusercontent.com/KatazzaHack/katazzahack.github.io/development/games/corona_game/pics/mask1.png",
    1: "https://raw.githubusercontent.com/KatazzaHack/katazzahack.github.io/development/games/corona_game/pics/mask2.png",
    2: "https://raw.githubusercontent.com/KatazzaHack/katazzahack.github.io/development/games/corona_game/pics/mask3.png"},
2: {0: "https://raw.githubusercontent.com/KatazzaHack/katazzahack.github.io/development/games/corona_game/pics/nomask1.png",
    1: "https://raw.githubusercontent.com/KatazzaHack/katazzahack.github.io/development/games/corona_game/pics/nomask2.png",
    2: "https://raw.githubusercontent.com/KatazzaHack/katazzahack.github.io/development/games/corona_game/pics/nomask3.png"},
1: {0: "https://raw.githubusercontent.com/KatazzaHack/katazzahack.github.io/development/games/corona_game/pics/vir1.png",
    1: "https://raw.githubusercontent.com/KatazzaHack/katazzahack.github.io/development/games/corona_game/pics/vir2.png",
    2: "https://raw.githubusercontent.com/KatazzaHack/katazzahack.github.io/development/games/corona_game/pics/vir3.png"}};

}

Game.prototype.get_new_network = function () {
  this.lifes = [1, 1, 2, 0, 1, 1, 1, 2, 3];
  var edges_got = [[1, 3], [1, 4], [0, 2], [1, 5], [7, 4], [1, 8], [7, 8]];
  this.types = new Array();
  this.matrix = new Array();
  this.network_size = this.lifes.length;
  for (var i = 0; i < this.network_size; ++i) {
    this.types.push(Math.floor(Math.random() * 3)); 
  }
  for (var i = 0; i < this.network_size; i++) {
    if (this.lifes[i] != 0) {
      this.nodes.add({id: i, label: '', image: this.take_image[this.lifes[i]][this.types[i]], shape: 'circularImage',
      border: '1', borderWidthSelected: '10', color: this.take_color[this.lifes[i]]});
    }
    this.matrix.push(new Array());
  }
  for (var i = 0; i < edges_got.length; i++) {
    this.edges.add({from: edges_got[i][0], to: edges_got[i][1], color: 'blue'});
    this.matrix[edges_got[i][0]].push(edges_got[i][1]);
    this.matrix[edges_got[i][1]].push(edges_got[i][0]);
  }
};

Game.prototype.draw_network = function () {
  var container = document.getElementById('game-container');
  for (var i = 0; i < this.network_size; i++) {
    if (this.lifes[i] != 0) {
      this.nodes.add({id: i, label: '', image: this.take_image[this.lifes[i]][this.types[i]], shape: 'circularImage',
      border: '1', borderWidthSelected: '10', color: this.take_color[this.lifes[i]]});
    }
    this.matrix.push(new Array());
  }
  for (var i = 0; i < edges_got.length; i++) {
    this.edges.add({from: edges_got[i][0], to: edges_got[i][1], color: 'blue'});
    this.matrix[edges_got[i][0]].push(edges_got[i][1]);
    this.matrix[edges_got[i][1]].push(edges_got[i][0]);
  }
  var data = {
    nodes: this.nodes,
    edges: this.edges
  };
  var options = {
    nodes: {
      borderWidth:4,
      size:40,
      color: {
        border: '#222222',
        background: '#666666'
      },
      font:{color:'#eeeeee'}
    },
    edges: {
      color: 'lightgray'
    }
  };
  this.network = new vis.Network(container, data, options);
}

Game.prototype.set_click_type = function (click_type) {
  this.click_type = click_type;
}

Game.prototype.on_node_selected = function (event) {
  console.log(event);
  var selected_node = event.nodes[0];
}

Game.prototype.on_double_click = function (event) {
  console.log(event);
  var selected_node = event.nodes[0];
  if (!(this.click_type in [0, 1, 2])) {
    alert("please select a click type");
    return 1;
  }
  
}

Game.prototype.init_listeners = function () {
  this.network.on("selectNode", this.on_node_selected);
  this.network.on("doubleClick", this.on_double_click);
}

Game.prototype.start = function () {
  this.get_new_network();
  this.draw_network();
  this.init_listeners();
}


export default = Graph;
