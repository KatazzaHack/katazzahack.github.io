function Game() {
  var data = new vis.DataSet(options);
  this.nodes = new vis.DataSet(options);
  this.edges = new vis.DataSet(options);
  this.lifes = new Array([]);
  this.network_size = 0;
  this.network;
  this.take_color = {0: "black", 1: "red", 2: "yellow", 3: "green"};
  this.take_image = {3: {
0: "https://raw.githubusercontent.com/KatazzaHack/KatazzaHack.github.io/development/pics2/mask1.png",
1: "https://raw.githubusercontent.com/KatazzaHack/KatazzaHack.github.io/development/pics2/mask2.png",
2: "https://raw.githubusercontent.com/KatazzaHack/KatazzaHack.github.io/development/pics2/mask3.png"},
2: {0: "https://raw.githubusercontent.com/KatazzaHack/KatazzaHack.github.io/development/pics2/nomask1.png",
   1: "https://raw.githubusercontent.com/KatazzaHack/KatazzaHack.github.io/development/pics2/nomask2.png",
   2: "https://raw.githubusercontent.com/KatazzaHack/KatazzaHack.github.io/development/pics2/nomask3.png"},
  1: {0: "https://raw.githubusercontent.com/KatazzaHack/KatazzaHack.github.io/development/pics2/vir1.png",
1: "https://raw.githubusercontent.com/KatazzaHack/KatazzaHack.github.io/development/pics2/vir2.png",
2: "https://raw.githubusercontent.com/KatazzaHack/KatazzaHack.github.io/development/pics2/vir3.png"}};



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
      this.nodes.add({id: i, label: '', image: this.take_image[this.lifes[i]][this.types[i]], shape: 'circularImage',
      border: '1', borderWidthSelected: '10', color: this.take_color[this.lifes[i]]});
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


qwe = new Game();
qwe.get_new_network();
qwe.draw_first_network();
